import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../../schemas';
import { CreateProductDto } from './dto';
import {
    BadRequestException,
    Body,
    ConflictException,
    Req,
  } from '@nestjs/common';
  import { Request } from 'express';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async createProduct(req:Request,body:CreateProductDto
  ): Promise<Product> {
    const { title, price } = body;
    const userId = req['authUser']._id;
    const product = new this.productModel({
      title,
      price,
      owner: userId,
    });
    await product.save();
    return product;
  }
}
