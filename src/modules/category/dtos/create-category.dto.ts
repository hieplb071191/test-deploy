import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: 'Đồ đi biển'
    })
    name: string
}