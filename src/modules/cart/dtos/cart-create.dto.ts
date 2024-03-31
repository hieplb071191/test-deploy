import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ProductDetailCreateDto } from "@src/modules/product/dtos/product-create.dto";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

class CartItems {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: 'product-detail1',
    })
    productName: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: '',
    })
    productDetailId: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        example: 1,
    })
    quantity: number

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        type: Number
    })
    price: number

}

export class CartCreateDto {
    @IsOptional()
    @Type(() => CartItems)
    @ValidateNested({each: true})
    @ApiPropertyOptional({
        type: CartItems,
    })
    items: CartItems[]
}