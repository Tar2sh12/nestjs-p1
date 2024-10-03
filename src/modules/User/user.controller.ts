import { Body, Controller, Get, Headers, Post, Req, Res, UseGuards, UsePipes } from "@nestjs/common";
import { UserService } from "./user.service";
import { Request,Response } from "express";
import { SignUpDto} from "./dto";
import { IsignUpResponse } from "./Interface";
import { ZodValidationPipe } from "../../Pipes/validation.pipe";
import { signUpValidationSchema } from "./user.validationSchema";
import { AuthGuard } from "../../Guards";
import { promises } from "dns";
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    getHello(): string {
        return this.userService.getHello();
    }

    @Post('signup')
    @UsePipes(new ZodValidationPipe(signUpValidationSchema))
    // @UseGuards(AuthGuard)
    async signUpHandler(
        @Body() body:SignUpDto,
        @Res() res : Response
    ): Promise<Response> {
        const response = await this.userService.signUp(body);
        return res.json({message:'ok',
            data:response
        });
    }
}