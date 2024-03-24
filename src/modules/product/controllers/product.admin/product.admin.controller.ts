import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductService } from '../../product.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@src/common/decorators/auth.decorator';
import { ProductCreateDto } from '../../dtos/product-create.dto';
import { User } from '@src/common/decorators/user.decorator';

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
    getProductByQuery(@Query() query) {
        return this.service.getProductByQuery({})
    }
}
