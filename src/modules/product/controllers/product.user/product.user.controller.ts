import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProductService } from "../../product.service";
import { Auth } from "@src/common/decorators/auth.decorator";
import { ProductListDto } from "../../dtos/product-list.dto";
import { query } from "express";
import { ProductDetailByInfo } from "../../dtos/product-detail-by-info.dto";

@ApiTags('product.user')
@Controller('product-user')
export class ProductUserController {
    constructor(
        private readonly service: ProductService
    ){}

    @Auth({
        operationId: 'user-get-all-product',
        roles: ['user']
    })
    @Get('product')
    getProductByQuery(@Query() query: ProductListDto) {
        return this.service.getProductByQuery(query)
    }

    @Auth({
        operationId: 'user-get-all-product',
        roles: ['user']
    })
    @Get('product/:productId')
    getOneProduct(@Param('productId') productId: string) {
        return this.service.getOneProduct(productId)
    }

    @Auth({
        operationId: 'get-productdetail-by-info'
    })
    @Get('/product-detail-by-info/:productId')
    getProductDetaiByInfo(@Query() query: ProductDetailByInfo, @Param('productId') productId) {
        return this.service.getOneProductDetailByInfo(query, productId)
    }
}