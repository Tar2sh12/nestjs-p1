import { Body, Controller, Get, Headers, Post, Req, Res, UsePipes } from "@nestjs/common";
import { UserService } from "./user.service";
import { Request,Response } from "express";
import { SignUpDto ,TokenInHeaderDto} from "./dto";
import { IsignUpResponse } from "./Interface";
import { ZodValidationPipe } from "../../Pipes/validation.pipe";
import { signUpValidationSchema } from "./user.validationSchema";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    getHello(): string {
        return this.userService.getHello();
    }

    @Post('signup')
    @UsePipes(new ZodValidationPipe(signUpValidationSchema))
    signUpHandler(
        @Headers('token') token: TokenInHeaderDto,
        @Body() body:SignUpDto,
        @Res() res : Response
    ): Response {
        return res.json({message:'ok',
            data:{
                id:1,
                name:body.name,
                email:body.email,
                pass:body.password,
                cPass:body.cPass
            }
        });
    }
}