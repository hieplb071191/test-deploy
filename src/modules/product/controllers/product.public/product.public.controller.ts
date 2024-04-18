import { Controller, Get, Query } from "@nestjs/common";
import { ProductService } from "../../product.service";
import { Public } from "@src/common/decorators/public.decorator";
import { ProductListDto } from "../../dtos/product-list.dto";
import { ApiTags } from "@nestjs/swagger";

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

    @Public('get-query-data')
    @Get('/get-query-data')
    getQueryData() {
        return this.service.getQueryDataProduct()
    }

}