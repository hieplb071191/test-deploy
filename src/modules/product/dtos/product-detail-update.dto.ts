import { ApiProperty, ApiPropertyOptional, OmitType, PickType } from "@nestjs/swagger";
import { ProductDetailCreateDto } from "./product-create.dto";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { QuantityUpdateType } from "../constant/product-detail.enum";

export class ProductDetailUpdateDto extends PickType(ProductDetailCreateDto, ['quantity', 'color','imageUrls','price', 'size']) {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String
    })
    _id: string
}

export class ProductDetailUpdateQuantityDto extends OmitType(ProductDetailUpdateDto, ['color', 'imageUrls', 'price', 'size']) {
    @IsEnum(QuantityUpdateType)
    @IsNotEmpty()
    @ApiProperty({
        enum: QuantityUpdateType,
        example: QuantityUpdateType.ADD_QUANTITY
    })
    typeQuantityUpdate: QuantityUpdateType
}