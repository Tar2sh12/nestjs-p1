import { IsEmail, IsEmpty, IsEnum, IsInt, IsNotEmpty, IsString, Length, MaxLength, Min, MinLength } from "class-validator";


export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)

    title:string;

    @IsInt()
    @IsNotEmpty()
    price:string;



}



