import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema, User, UserSchema } from "./index";




export const models = MongooseModule.forFeature([
    {
        name:User.name,
        schema:UserSchema
    },
    {
        name:Product.name,
        schema:ProductSchema
    }
])