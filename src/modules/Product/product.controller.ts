import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { Request, Response } from 'express';

import { AuthGuard, RolesGuard } from '../../Guards';
import { Roles } from 'src/decorators';
import { CreateProductDto } from './dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RedisOptions } from '../../core/config';
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  async getProducts(@Res() res: Response): Promise<Response> {
    //test redis
    // RedisOptions.useFactory();

    const cahedData = await this.cacheManager.set('product', JSON.stringify({title:"mobilee",price:2000}));
    const cahedData22 = await this.cacheManager.get('products')
    console.log({ cahedData22 });

    return res.status(200).json({ message: 'hi' });
  }

  @Post('create')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['admin'])
  async onlyAdmins(
    @Body() body: CreateProductDto,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    const respon = await this.productService.createProduct(req, body);
    return res.status(200).json({ message: 'hi admin', data: respon });
  }
}
