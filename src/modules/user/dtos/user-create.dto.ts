import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsLatitude, IsLongitude, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { faker } from '@faker-js/faker';
import { Type } from "class-transformer";

class AddressDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: faker.location.cardinalDirection()
    })
    specialAddress: string;

    @IsLatitude()
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        example: faker.location.latitude()
    })
    lat: number

    @IsLongitude()
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        example: faker.location.longitude()
    })
    long: number
}

export class UserCreateDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: faker.internet.email()
    })
    email: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: faker.person.firstName()
    })
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: faker.person.lastName()
    })
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: faker.internet.password()
    })
    password: string;

    @Type(() => AddressDto)
    @IsOptional()
    @ApiPropertyOptional({
        type: AddressDto
    })
    address: AddressDto;

}