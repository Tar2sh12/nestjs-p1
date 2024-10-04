import { Module } from "@nestjs/common";

import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from "./config";
@Module({
    imports:[CacheModule.registerAsync(RedisOptions)],
    controllers:[],
    providers:[],
    exports:[]
})

export class CoreModule{

    
}