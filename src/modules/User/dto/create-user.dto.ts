import { IsEmail, IsEmpty, IsEnum, IsInt, IsNotEmpty, IsString, Length, MaxLength, Min, MinLength } from "class-validator";


export class 
SignUpDto {
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
    @IsNotEmpty()
    age:string;


    @IsString()
    @IsEnum(['user','admin'])
    role:string;

}


export class LoginDto {

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string;


    @IsString()
    @IsNotEmpty()
    password:string;


}