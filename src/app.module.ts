import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/User/user.module';
import { MongooseModule } from '@nestjs/mongoose';
// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './Guards';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/Product/product.module';
import { CoreModule } from './core/core.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.${process.env.NODE_ENV}.env`, '.env'],
    }),
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/nest-p1'),
    ProductModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
