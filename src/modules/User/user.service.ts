import {
  BadRequestException,
  Body,
  ConflictException,
  Injectable,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../schemas';
import { LoginDto, SignUpDto } from './dto';
import { hashSync } from 'bcrypt';
import { IsignUpResponse } from './Interface';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Hello !';
  }

  async signUp(@Body() body: SignUpDto): Promise<IsignUpResponse> {
    const { name, email, password, age, role } = body;
    const isEmailExists = await this.userModel.findOne({ email });
    if (isEmailExists) {
      throw new ConflictException('email already exists');
    }
    const hashedPassword = hashSync(password, 10);
    const user = new this.userModel({
      name,
      email,
      password: hashedPassword,
      age,
      role,
    });

    await user.save();
    const response: IsignUpResponse = {
      _id: user._id,
      email: user.email,
      name: user.name,
      age: user.age,
      role: user.role,
    };
    return response;
  }

  async login(body: LoginDto): Promise<string> {
    const { email, password } = body;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('wrong credentials');
    }
    const token = this.jwtService.sign(
      {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
      { secret: 'secretKey', expiresIn: '1d' },
    );
    return token;
  }

  async getProfile(req: Request): Promise<User> {
    const user = await this.userModel.findById(req['authUser']._id);
    return user;
  }
}
