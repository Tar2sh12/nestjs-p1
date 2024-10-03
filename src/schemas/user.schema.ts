import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { string } from 'zod';
// import { HydratedDocument } from 'mongoose';

// export type CatDocument = HydratedDocument<Cat>;

@Schema({timestamps: true})
export class User {
  @Prop({
    required: true,
    type: String,
    lowercase: true,
  })
  name: string;
  @Prop({
    required: true,
    type: String,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
    type: String,
  })
  password: string;



  @Prop({
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  })
  role: string;



  @Prop({
    min:10,
    type: Number,
    required: true
  })
  age: number;


//   array of string
//   @Prop([String])
//   tags: string[];

}

const UserSchema = SchemaFactory.createForClass(User);
export const UserModel = MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])