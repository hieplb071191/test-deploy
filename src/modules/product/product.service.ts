import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { ProductDetailRepository } from './repositories/product-detail.repository';
import { ProductCreateDto } from './dtos/product-create.dto';
import { ProductError } from './constant/product-erorr.enum';
import { ProductListDto } from './dtos/product-list.dto';
import getSort from '@src/common/utils/get-sort-by.util';
import { ProductUpdateDto } from './dtos/product-update.dto';

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
            query['$or'] = [
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
        if (query.page && query.perPage) {
 
            options['skip'] = (query.page - 1) *  query.perPage,
            options['limit'] = query.perPage
  
            const [result, total] = await Promise.all([
                this.productRepository.findAll(_query, projection, options),
                this.productRepository.countAll(_query)
            ])
            return {
                rows: result,
                total: total,
                page: query.page,
                perPage: query.perPage,
                totalPage: Math.floor(
                    (total[1] + query.perPage - 1) / query.perPage
                )
            }
        } else {
            const result = await this.productRepository.findAll(_query, projection)
            return result
        }
        
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
                await this.productRepository.updateOne({id: product.id}, {productDetail: listProductPopulate})
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
}
