import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserGenderEnum } from "@src/modules/user/constant/user.constant";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, Min, ValidateNested } from "class-validator";
import { ProductTypeEnum } from "../constant/product.enum";

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
        example: [
            'https://mcdn2.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2023/QSBCBS3D.4.jpg',
            'https://product.hstatic.net/1000406172/product/1002_800x_cd2679a0a5d14e69a6790112298f9ec5_large.jpg',
            'https://product.hstatic.net/1000406172/product/1004_800x_3fe4ec3492be49258c041703b4b3a41b_master.jpg',
            'https://product.hstatic.net/1000406172/product/1000_800x_1e2c9c812a33429eab8daf93967506b5_master.jpg'

        ]
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

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({
        type: [String],
        example: ['https://product.hstatic.net/1000406172/product/620_800x_b4eacb4c96924d26b1b6e24008d9005c_large.jpg']
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

    @IsEnum(UserGenderEnum)
    @IsNotEmpty()
    @ApiProperty({
        enum: UserGenderEnum
    })
    gender: UserGenderEnum

    @IsEnum(ProductTypeEnum)
    @IsNotEmpty()
    @ApiProperty({
        enum: ProductTypeEnum
    })
    type: ProductTypeEnum
}