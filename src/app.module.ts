import { Module } from '@nestjs/common';
import config from './config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
import { RedisModule } from './components/redis/redis.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      load: config,
      cache: true,
    }),

    // Database default Connection.
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) =>
        config.get('database.default'),
      inject: [ConfigService],
    }),
    RedisModule,
    EventsModule,
  ],
  providers: [],
})
export class AppModule {}
