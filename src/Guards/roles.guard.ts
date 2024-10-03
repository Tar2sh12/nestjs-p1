import { Injectable, CanActivate, ExecutionContext, BadGatewayException, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas';
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector,@InjectModel(User.name) private userModel: Model<User> ,private readonly jwtService: JwtService) {}
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean>  {

    const allowedRoles = this.reflector.get(Roles, context.getHandler());
    if (!allowedRoles) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    console.log(allowedRoles);
    
    console.log('=========================roles===========================');
    
    const {token} = request.headers;
    if(!token){
        throw new BadRequestException('token not found');
    }
    //check prefix 
    if(!token.startsWith('test')){
        throw new BadRequestException('token not valid');
    }
    const originalToken = token.split(' ')[1];
    //decode 
    const decodedToken = this.jwtService.verify(originalToken,{secret:"secretKey"});

    //find user in db 
    const user = await this.userModel.findById(decodedToken._id);
    if(!user){
        throw new BadRequestException('please login');
    }
    if (!allowedRoles.includes(user.role)) {
        throw new BadRequestException('you are not authorized');
    }
    return true;
  }
}
