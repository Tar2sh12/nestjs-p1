import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../../schemas';
import { CreateProductDto } from './dto';
import { Request } from 'express';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createProduct(req: Request, body: CreateProductDto): Promise<Product> {
    const { title, price } = body;
    const userId = req['authUser']._id;
    const product = new this.productModel({
      title,
      price,
      owner: userId,
    });
    await product.save();
    const products =await this.productModel.find();
    await this.cacheManager.set('products', JSON.stringify(products));
    
    return product;
  }

  async buildProduct(): Promise<boolean> {
    const products =await this.productModel.find();
    await this.cacheManager.set('products', JSON.stringify(products));
    return true;
  }

  async getProducts(): Promise<Product[]> {
    const cahedData = JSON.parse(await this.cacheManager.get('products'));
    if(!cahedData){
      await this.buildProduct();
      console.log(cahedData);
      return JSON.parse(await this.cacheManager.get('products'));
    }
    return cahedData;
  }
}
