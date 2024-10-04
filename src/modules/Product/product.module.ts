import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { models } from "../../schemas/";
import { JwtService } from "@nestjs/jwt";
@Module({
    imports: [models],
    controllers: [ProductController],
    providers: [ProductService,JwtService],
})
export class ProductModule { }