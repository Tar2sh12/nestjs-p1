import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { LoginDto, SignUpDto } from './dto';
import { IsignUpResponse } from './Interface';
import { ZodValidationPipe } from '../../Pipes/validation.pipe';
import {
  signUpValidationSchema,
  loginValidationSchema,
} from './user.validationSchema';
import { AuthGuard, RolesGuard } from '../../Guards';
import { Roles } from '../../decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Post('signup')
  @UsePipes(new ZodValidationPipe(signUpValidationSchema))
  // @UseGuards(AuthGuard)
  async signUpHandler(
    @Body() body: SignUpDto,
    @Res() res: Response,
  ): Promise<Response> {
    const response = await this.userService.signUp(body);
    return res.json({ message: 'ok', data: response });
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(loginValidationSchema))
  async loginHandler(
    @Body() body: LoginDto,
    @Res() res: Response,
  ): Promise<Response> {
    const response = await this.userService.login(body);

    return res.status(200).json({ message: 'ok', data: response });
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const data = await this.userService.getProfile(req);
    return res.status(200).json({ message: 'ok', data: data });
  }

  @Get('only-admins')
  //   @UseGuards(AuthGuard)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['admin'])
  onlyAdmins(@Res() res: Response): Response {
    return res.status(200).json({ message: 'hi admin' });
  }
}
