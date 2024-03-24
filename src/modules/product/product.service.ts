import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { ProductDetailRepository } from './repositories/product-detail.repository';
import { ProductCreateDto } from './dtos/product-create.dto';
import { ProductError } from './constant/product-erorr.enum';

@Injectable()
export class ProductService {
    
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly productDetailRepository: ProductDetailRepository
    ){}

    async getProductByQuery(query: any) {
        const result = await this.productRepository.findPopulate()
        return result
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
}
