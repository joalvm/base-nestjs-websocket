import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useWebSocketAdapter(new WsAdapter(app));

  await app.listen(app.get(ConfigService).get<number>('app.port'));

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
