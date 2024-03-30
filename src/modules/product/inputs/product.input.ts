import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class ProductListInput {

    @Field(() => String)
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'h'
    })
    search: string
}