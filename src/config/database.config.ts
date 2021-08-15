import { registerAs } from '@nestjs/config';
import { normalize } from 'path';

export default registerAs('database', () => ({
  default: {
    name: 'default',
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    schema: 'public',
    synchronize: false,
    entities: [normalize(__dirname + '/entities/**/*.{ts,js}')],
    logging: process.env.APP_ENV === 'local' ? ['query', 'warn'] : false,
  },
}));
