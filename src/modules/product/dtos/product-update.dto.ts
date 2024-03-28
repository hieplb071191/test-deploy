import { ApiProperty, PickType } from "@nestjs/swagger";
import { ProductCreateDto } from "./product-create.dto";
import { IsNotEmpty, IsString } from "class-validator";
import { faker } from "@faker-js/faker";

export class ProductUpdateDto extends PickType(ProductCreateDto, ['name', 'branch'])  {
}