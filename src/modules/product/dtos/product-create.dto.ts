import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString, Min, ValidateNested } from "class-validator";

export class ProductDetailCreateDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: 'N'
    })
    size: String;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: 'N'
    })
    color: String;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        example: 5500
    })
    price: Number;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({
        type: [String],
        example: ['https://mcdn2.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2023/QSBCBS3D.4.jpg']
    })
    imageUrls: string[]

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @ApiProperty({
        type: Number,
        example: 1
    })
    quantity: number
}

export class ProductCreateDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: 'jogging-women'
    })
    name: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: 'skirt'
    })
    branch: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: [String],
        example: ['https://mcdn2.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2023/QSBCBS3D.4.jpg']
    })
    imageUrls: string[]

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: 'cate1'
    })
    categoryId: string

    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: 'cate1'
    })
    productCode: string

    @Type(() => ProductDetailCreateDto)
    @ValidateNested({each: true})
    @ApiPropertyOptional({
        type: [ProductDetailCreateDto]
    })
    productDetail: ProductDetailCreateDto[]
}