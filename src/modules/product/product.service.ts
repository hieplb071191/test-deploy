import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { ProductDetailRepository } from './repositories/product-detail.repository';
import { ProductCreateDto, ProductDetailCreateDto } from './dtos/product-create.dto';
import { ProductError } from './constant/product-erorr.enum';
import { ProductListDto } from './dtos/product-list.dto';
import getSort from '@src/common/utils/get-sort-by.util';
import { ProductUpdateDto } from './dtos/product-update.dto';
import {v4} from 'uuid'
import { ListProductDetailDto } from './dtos/productdetail-list.dto';
import { PipelineStage } from 'mongoose';
import { ProductDetailUpdateDto, ProductDetailUpdateQuantityDto } from './dtos/product-detail-update.dto';
import { QuantityUpdateType } from './constant/product-detail.enum';

@Injectable()
export class ProductService {
    
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly productDetailRepository: ProductDetailRepository
    ){}

    async getProductByQuery(query: ProductListDto) {
        const _query = {}
        const options: any = {
            sort: {
                createdAt: -1
            }
        }
        if (query.search) {
            _query['$or'] = [
                {
                    name: {
                        $regex: query.search,
                        $options: "i"
                    }
                },
                {
                    branch: {
                        $regex: query.search,
                        $options: "i"
                    }
                }
            ]
        }
        if (query.categoryId) {
            _query['categoryId'] = query.categoryId
        }

        if (query.productCode) {
            _query['productCode'] = query.productCode
        }

        const projection = {
            name: 1,
            branch: 1,
            imageUrls: 1,
            productCode: 1,
            id: 1,
            createdAt: 1,
            updatedAt: 1,
            productDetails: 1,
        }
        if (query.fields) {
            const listFields = query.fields.split(',')
            for (let field of listFields) {
                projection[field.trim()] = 1
            }
        }
        if (query.sort) {
            const sort = getSort(query.sort)
            options['sort'] = sort
        }

        const aggregate: PipelineStage[] = [
            {
                $match: _query
            },
            {
                $lookup: {
                    from: 'productdetails',
                    foreignField: 'product',
                    localField: '_id',
                    as: 'productDetails'
                }
            }
        ]

        if (query.low || query.high) {
            const { low, high } = query
            const and = []
            low && and.push({
                'productDetails.price': {
                    $gte: low
                }
            });

            high && and.push({
                'productDetails.price': {
                    $lte: high
                }
            })
            aggregate.push({
                $match: {
                    $and: and
                }
            })
        }
        
        aggregate.push({
            $project: projection
        })
        if (query.page && query.perPage) {
 
            options['skip'] = (query.page - 1) *  query.perPage,
            options['limit'] = query.perPage
  
            const [result, [total]] = await Promise.all([
                this.productRepository.rawData(aggregate),
                this.productRepository.rawData([
                    ...aggregate,
                    {
                        $group: {
                            _id: '_id',
                            total: {
                                $sum: 1
                            }
                        }
                    }    
                ])
            ]) as any[]
            return {
                rows: result,
                total: total?.total,
                page: query.page,
                perPage: query.perPage,
                totalPage: total?.total  ? Math.floor(
                    (total.total + query.perPage - 1) / query.perPage
                ) : 0
            }
        } else {
            const result = await this.productRepository.rawData(aggregate)
            return {
                rows: result
            }
        }
        
    }

    async getOneProduct(_id: string) {
        return await this.productRepository.findOne({_id: _id})
    }

    async createProduct(dto: ProductCreateDto, user) {
        try {
            const {
                name,
                categoryId,
                productCode,
                productDetail,
                imageUrls,
                branch
            } = dto
    
            const oldProduct = await this.productRepository.findOne({
                $or: [
                    {
                        $and: [
                            {
                                name,
                            },
                            {
                                categoryId
                            }
                        ]
                    },
                    {
                        productCode,
                    }
                ]
            })
            if (oldProduct) {
                throw new BadRequestException(ProductError.PRODUCT_EXISTED)
            }
    
            const productModel = {
                name,
                productCode,
                categoryId,
                branch,
                imageUrls,
                createdBy: user.id,
                updatedBy: user.id
            }
    
            const product = await this.productRepository.create(productModel)
            if (productDetail?.length) {
                const listProductPopulate = []
                for (let detail of productDetail) {
                    const createModel = {
                        product: product._id,
                        size: detail.size,
                        color: detail.color,
                        imageUrls: detail.imageUrls,
                        price: detail.price,
                        quantity: detail.quantity
                    }
                    const productDetail = await this.productDetailRepository.create(createModel)
                    listProductPopulate.push(productDetail._id)
                }
                await this.productRepository.updateOne({_id: product._id}, {productDetail: listProductPopulate})
            }
            return {success: true}
        } catch(e) {
            console.log(e)
            throw new BadGatewayException()
        }
    }

    async updateProduct(dto: ProductUpdateDto, id: string, user) {
        const {name, branch} = dto
        const model = await this.productRepository.findById(id)
        if (!model) {
            throw new BadRequestException(ProductError.PRODUCT_NOT_FOUND)
        }
        if (name) {
            model['name'] = name
        }
        if (branch) {
            model['branch'] = branch
        }
        model.updatedBy = user.id
        model.updatedAt = new Date()
        return await this.productRepository.updateOne({id}, model)
    }

    async createProductDetail(dtos: ProductDetailCreateDto[], productId: string, user) {
        for (let dto of dtos) {
            const oldDetail = await this.productDetailRepository.findOne({
                product: productId,
                size: dto.size,
                color: dto.color,
            })
            if (!oldDetail) {
                const createModel = {
                    ...dto, 
                    product: productId,
                    createdBy: user.id,
                    updatedBy: user.id
                }
                await this.productDetailRepository.create(createModel)
            } else {
                const updateModel = {
                    $set: {
                        price: dto.price
                    },
                    $inc: {
                        quantity: dto.quantity,
                    }
                }
                await this.productDetailRepository.updateOne({id: oldDetail.id}, updateModel)
            }
        }
        return true
    }

    async getProductDetailByQuery(query: ListProductDetailDto, productId: string) {
        let { size, color, perPage, page } = query
        perPage = perPage ? Number(perPage) : null
        page = page ? Number(page) : null
        const match = {
            product: productId
        }

        if (size) {
            match[size] = size
        }
        if (color) {
            match[color] = color
        }

        const aggregate: PipelineStage[] = [
            {
                $match: match
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'product',
                    pipeline: [
                        {
                            $project: {
                                name: 1,
                                productCode: 1,
                                branch: 1,
                                imageUrls: 1,
                            }
                        }
                    ]
                }
            },
        ]

        if (page && perPage) {
            aggregate.push({
                $skip: (page - 1) * perPage
            }, {
                $limit: perPage
            }
            )
            const [productDetails, total] = await Promise.all(
                [
                    this.productDetailRepository.rawData(aggregate),
                    this.productDetailRepository.countAll(match)
                ]
            )
            return {
                rows: productDetails,
                total,
                page,
                perPage,
                totalPage: Math.floor(
                    (total + query.perPage - 1) / query.perPage
                )
            }
        } else {
            const productDetails = await this.productDetailRepository.rawData(aggregate)
            return {
                rows: productDetails
            }
        }
    }

    async updateProductDetail (dto: ProductDetailUpdateDto, user) {
        const model = await this.productDetailRepository.findOne({_id: dto._id})
        if (!model) {
            throw new BadGatewayException(ProductError.PRODUCT_NOT_FOUND)
        }

        const updateModel = {
            ...model,
            ...dto
        }
        return await this.productDetailRepository.updateOne({_id: dto._id},updateModel)

    }

    async updateQuantityProductDetail(
        dto: ProductDetailUpdateQuantityDto
    ) {
        const {
            typeQuantityUpdate,
            _id,
            quantity
        } = dto

        const model = await this.productDetailRepository.findOne({_id})
        if (!model) {
            throw new BadGatewayException(ProductError.PRODUCT_NOT_FOUND)
        }
        if (typeQuantityUpdate === QuantityUpdateType.ADD_QUANTITY) {
            const updateModel = {
                $inc: {
                    quantity: quantity
                }
            }
            return await this.productDetailRepository.updateOne({_id}, updateModel)
        } else {
            const updateModel = {
                $inc: {
                    quantity: -quantity
                }
            }
            return await this.productDetailRepository.updateOne({_id}, updateModel)
        }
    }

    async getOneProductDetailByInfo(query, productId) {
        return await this.productDetailRepository.findOne({
            product: productId,
            size: query.size,
            color: query.color
        })
    }
}
