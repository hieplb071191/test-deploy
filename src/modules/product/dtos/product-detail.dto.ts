import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { ProductDetailCreateDto } from "./product-create.dto";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class DetailProductCreateDto {

    @Type(() => ProductDetailCreateDto)
    @ValidateNested({each: true})
    @ApiProperty({
        type: [ProductDetailCreateDto]
    })
    details: ProductDetailCreateDto[]


}