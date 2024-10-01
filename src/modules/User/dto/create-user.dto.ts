import { IsEmail, IsInt, IsNotEmpty, IsString, Length, MaxLength, Min, MinLength } from "class-validator";


export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    // @Length(3,20)
    @MinLength(3)
    @MaxLength(20)
    name:string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string;


    @IsString()
    @IsNotEmpty()
    password:string;

    
    @IsString()
    @IsNotEmpty()
    cPass:string;

    @IsInt()
    @Min(10)
    age:number;
}



export class TokenInHeaderDto {

    @IsInt()
    token:string;
} 