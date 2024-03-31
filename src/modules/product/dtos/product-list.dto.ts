import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBiggerThan } from "@src/common/custom-validation/is-bigger-than.decorator";
import { Transform, Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateIf } from "class-validator";


@InputType()
export class ProductListDto {

    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        example: ''
    })
    search: string;

    @Field(() => Number, {nullable: true})
    @Transform((obj) => Number(obj.value))
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({
        type: Number,
        example: 1
    })
    page: number;

    @Field(() => Number, {nullable: true})
    @Transform((obj) => Number(obj.value))
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({
        type: Number,
        example: 10
    })
    perPage: number;

    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        example: ''
    })
    productCode: string;

    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        example: ''
    })
    categoryId: string

    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        example: 'name,id,branch,categoryId'
    })
    fields: string

    @Field(() => String, {nullable: true})
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        example: '-name,-branch'
    })
    sort: string

    @Transform((value) => Number(value.value))
    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({
        type: Number,
        example: 1000
    })
    low: number


    @Transform((value) => Number(value.value))
    @IsNumber()
    @IsOptional()
    @ValidateIf(obj => obj.low && obj.high)
    @IsBiggerThan('low', {
        message: 'high is not less than low'
    })
    @ApiPropertyOptional({
        type: Number,
        example: 10000
    })
    high: number
    
}