import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

export class OrderDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    sum: number;

    @ApiProperty()
    @IsObject()
    @IsNotEmpty()
    productsQuantity: {
        productId: number,
        quantity: number
    }[]

    @ApiProperty()
    @IsNumber()
    userId: number

    @ApiProperty()
    @IsBoolean()

    zakazno?: boolean

    @ApiProperty()
    @IsBoolean()
    ddostavleno?: boolean

    @ApiProperty()
    @IsBoolean()
    otpravleno?: boolean

    @ApiProperty()
    @IsString()
    magazin?: string

}