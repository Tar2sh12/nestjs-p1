import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@InjectModel(User.name) private userModel: Model<User> ,private readonly jwtService: JwtService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    console.log('=========================auth===========================');
    const {token} = request.headers;
    if(!token){
        throw new BadRequestException('token not found');
    }
    //check prefix 
    if(!token.startsWith(process.env.PREFIX)){
        throw new BadRequestException('token not valid');
    }
    const originalToken = token.split(' ')[1];
    //decode 
    const decodedToken = this.jwtService.verify(originalToken,{secret:process.env.LOGIN_SECRET});

    //find user in db 
    const user = await this.userModel.findById(decodedToken._id);
    if(!user){
        throw new BadRequestException('please login');
    }
    // inject authUser in request
    request.authUser = user;
    return true;
    // return validateRequest(request);
  }
}