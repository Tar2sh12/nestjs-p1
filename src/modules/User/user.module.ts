import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { models } from "../../schemas/";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [models],
    controllers: [UserController],
    providers: [UserService,JwtService],
})
export class UserModule { }