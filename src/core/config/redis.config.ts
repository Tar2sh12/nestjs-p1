//port host password
import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  useFactory: async () => {
    const port = parseInt(process.env.REDIS_PORT) || 6379;
    const host = process.env.REDIS_HOST || 'localhost';
    const password = process.env.REDIS_PASSWORD || '';
    console.log({ port, host, password });
    
    const store = await redisStore({
      password,
      socket: {
        host,
        port,
      },
    });
    return {
      store: () => store
    };
  },
};
