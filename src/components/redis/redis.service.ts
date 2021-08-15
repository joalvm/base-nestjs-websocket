import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { RedisClient } from 'redis';
import { dot } from '../../helpers';
import { promisify } from 'util';

export const OK = 'OK';
export type OK = typeof OK;

@Injectable()
export class RedisService {
  client: RedisClient;

  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {
    this.client = (this.cache.store as any).getClient() as RedisClient;
  }

  get<T>(field: string): Promise<T> {
    return promisify(this.client.get).bind(this.client)(field);
  }

  set(field: string, value: any): string {
    return promisify(this.client.set).bind(this.client)(field, value);
  }

  hset(field: string, data: { [K: string]: any }): OK {
    const values = [];

    for (const [key, value] of Object.entries(dot(data))) {
      values.push(key, value);
    }

    return promisify(this.client.hset).bind(this.client)(field, ...values);
  }

  hget(field: string, keys: string | string[]) {
    const command = typeof keys === 'string' ? 'hget' : 'hmget';

    return promisify(this.client[command]).bind(this.client)(field, keys);
  }
}
