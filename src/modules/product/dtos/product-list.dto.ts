import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

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
}