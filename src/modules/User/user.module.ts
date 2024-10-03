import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserModel } from "../../schemas";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [UserModel],
    controllers: [UserController],
    providers: [UserService,JwtService],
})
export class UserModule { }