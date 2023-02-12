import { IsArray, IsNotEmpty, IsString } from "class-validator"

export class ColletionDTO{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsArray()
    products: number[]
}