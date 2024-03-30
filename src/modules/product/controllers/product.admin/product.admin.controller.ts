import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductService } from '../../product.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@src/common/decorators/auth.decorator';
import { ProductCreateDto, ProductDetailCreateDto } from '../../dtos/product-create.dto';
import { User } from '@src/common/decorators/user.decorator';
import { ProductListDto } from '../../dtos/product-list.dto';
import { ProductUpdateDto } from '../../dtos/product-update.dto';
import { DetailProductCreateDto } from '../../dtos/product-detail.dto';
import { ListProductDetailDto } from '../../dtos/productdetail-list.dto';
import { ProductDetailUpdateDto } from '../../dtos/product-detail-update.dto';

@ApiTags('product-admin')
@Controller('product-admin')
export class ProductAdminController {
    constructor(
        private readonly service:ProductService
    ) {

    }

    @Auth({
        operationId: 'admin create product',
        roles: ['admin', 'user']
    })
    @Post('/create-product')
    createProduct(@Body() dto: ProductCreateDto, @User() user) {
        return this.service.createProduct(dto, user)
    }

    @Auth({
        operationId: 'admin load product',
        roles: ['admin', 'user']
    })
    @Get('/product')    
    getProductByQuery(@Query() query: ProductListDto) {
        return this.service.getProductByQuery(query)
    }

    @Auth({
        operationId: 'admin-get-one-product',
        roles: ['admin']
    })
    @Get('/product/:productId')
    getProductById(@Param('productId') productId: string) {
        return this.service.getOneProduct(productId)
    }

    @Auth({
        operationId: 'Admin update product',
        roles: ['admin']
    })
    @Put('product/:id')
    updateProduct(@Body() dto: ProductUpdateDto, @Param('id') id: string, @User() user: any) {
        return this.service.updateProduct(dto, id, user)
    }

    @Auth({
        operationId: 'Admin creat product detail',
        roles: ['admin']
    })
    @Post('product-detail/:productId')
    createProductDetail(@Param('productId') productId: string, @User() user, @Body() dtos: DetailProductCreateDto) {
        return this.service.createProductDetail(dtos.details, productId, user)
    }

    @Auth({
        operationId: 'Admin-get-list-product-detail',
        roles: ['admin']
    })
    @Get('/list-product-detail/:productId')
    getListProductDetail(@Query() query: ListProductDetailDto, @Param('productId') productId: string) {
        return this.service.getProductDetailByQuery(query, productId)
    }

    @Auth({
        operationId: 'admin-update-product-detail',
        roles: ['admin']
    })
    @Put('/update-product-detail')
    updateProductDetail(@Body() dto: ProductDetailUpdateDto, @User() user) {
        return this.service.updateProductDetail(dto, user)
    }
}
