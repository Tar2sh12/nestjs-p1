import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserModel } from "../../schemas";

@Module({
    imports: [UserModel],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule { }