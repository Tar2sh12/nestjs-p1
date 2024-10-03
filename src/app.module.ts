import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/User/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './Guards';
@Module({
  imports: [UserModule,MongooseModule.forRoot('mongodb://localhost/nest-p1')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
