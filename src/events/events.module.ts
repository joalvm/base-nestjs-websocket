import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from 'src/components/redis/redis.module';
import EventsGateway from './events.gateway';

@Module({
  imports: [ConfigModule, RedisModule],
  providers: [EventsGateway],
})
export class EventsModule {}
