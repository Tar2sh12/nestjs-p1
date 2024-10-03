import { Body, ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { User } from "../../schemas";
import { SignUpDto } from "./dto";
import { hashSync } from "bcrypt";

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    getHello(): string {
        return 'Hello !';
    }

    async signUp(
        @Body() body:SignUpDto,
    ): Promise<any> {
        const {name,email,password,age,role} = body;
        const isEmailExists= await this.userModel.findOne({email});
        if(isEmailExists){
            throw new ConflictException('email already exists');
        }
        const hashedPassword = hashSync(password,10);
        const user =new this.userModel({
            name,
            email,
            password:hashedPassword,
            age,
            role
        })

        await user.save();


        return user;

    }
}