import { InputType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class ListProductDetailDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        example: ''
    })
    color?: string

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        example: '',
    })
    size?: string;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({
        type: Number,
        example: 1
    })
    @Transform(({value}) => Number(value))
    page?: number

    @IsNumber()
    @IsOptional()
    @Transform(({value}) => Number(value))
    @ApiPropertyOptional({
        type: Number,
        example: 10
    })
    perPage?: number
}

export class ProductDetailByInfoDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: ''
    })
    color: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: ''
    })
    size: string
}
