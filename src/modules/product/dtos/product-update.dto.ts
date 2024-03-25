import { ApiProperty, PickType } from "@nestjs/swagger";
import { ProductCreateDto } from "./product-create.dto";
import { IsNotEmpty, IsString } from "class-validator";
import { faker } from "@faker-js/faker";

export class ProductUpdateDto extends PickType(ProductCreateDto, ['name', 'branch'])  {
    // @IsString()
    // @IsNotEmpty()
    // @ApiProperty({
    //     type: String,
    //     example: 'data1'
    // })
    // name: string

    // @IsString()
    // @IsNotEmpty()
    // @ApiProperty({
    //     type: String,
    //     example: 'branch1'
    // })
    // branch: string
}