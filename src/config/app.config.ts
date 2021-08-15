import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env.APP_NAME,
  env: process.env.APP_ENV,
  key: process.env.APP_ENV,
  debug: process.env.APP_DEBUG,
  port: parseInt(process.env.PORT, 10) || 8080,
  url: process.env.APP_URL,
}));
