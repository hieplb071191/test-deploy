import { Controller, Get, Param, Query } from "@nestjs/common";
import { ProductService } from "../../product.service";
import { Public } from "@src/common/decorators/public.decorator";
import { ProductListDto } from "../../dtos/product-list.dto";
import { ApiTags } from "@nestjs/swagger";
import { ProductDetailByInfoDto } from "../../dtos/productdetail-list.dto";

@ApiTags('product-public')
@Controller('product-public')
export class ProductPublicController {
    constructor(
        private readonly service: ProductService
    ){}

    @Public('product-public-get-by-query')
    @Get('/product')
    getProducByQuery( @Query() query: ProductListDto) {
        return this.service.getProductByQuery(query)
    }
    
    @Public('get-one-product')
    @Get('/get-one-product/:id')
    getDetailProduct(@Param('id') id: string ) {
        return this.service.getOneProduct(id)
    }

    @Public('get-query-data')
    @Get('/get-query-data')
    getQueryData() {
        return this.service.getQueryDataProduct()
    }

    @Public('get-product-detail-by-info')
    @Get('product-detail-by-info/:productId')
    getProductDetailByInfo(@Query() query: ProductDetailByInfoDto, @Param('productId') productId: string) {
        return this.service.getOneProductDetailByInfo(query, productId)
    }

}