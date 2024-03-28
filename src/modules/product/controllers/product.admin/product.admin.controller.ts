import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductService } from '../../product.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@src/common/decorators/auth.decorator';
import { ProductCreateDto, ProductDetailCreateDto } from '../../dtos/product-create.dto';
import { User } from '@src/common/decorators/user.decorator';
import { ProductListDto } from '../../dtos/product-list.dto';
import { ProductUpdateDto } from '../../dtos/product-update.dto';
import { DetailProductCreateDto } from '../../dtos/product-detail.dto';

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
    createProductDetail(@Param('productId') productId, @User() user, @Body() dtos: DetailProductCreateDto) {
        return this.service.createProductDetail(dtos.details, productId, user)
    }
}
