import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class ProductListDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        example: ''
    })
    search: string;

    @Transform((obj) => Number(obj.value))
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({
        type: Number,
        example: 1
    })
    page: number;

    @Transform((obj) => Number(obj.value))
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({
        type: Number,
        example: 10
    })
    perPage: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        example: ''
    })
    productCode: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        example: ''
    })
    categoryId: string

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        example: 'name,id,branch,categoryId'
    })
    fields: string

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        example: '-name,-branch'
    })
    sort: string
}