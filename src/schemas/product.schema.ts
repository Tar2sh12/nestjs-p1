import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
// import { HydratedDocument } from 'mongoose';

// export type CatDocument = HydratedDocument<Cat>;

@Schema({timestamps: true})
export class Product {
  @Prop({
    required: true,
    type: String,
    lowercase: true,
  })
  title: string;
  @Prop({
    required: true,
    type: Number,
  })
  price: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
  })
  owner: string;

}

export const ProductSchema = SchemaFactory.createForClass(Product);
