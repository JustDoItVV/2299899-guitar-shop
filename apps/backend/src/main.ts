/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { BACKEND_GLOBAL_PREFIX } from '@guitar-shop/consts';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error'] });
  app.enableCors();
  app.setGlobalPrefix(BACKEND_GLOBAL_PREFIX);

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.APP_PORT;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${BACKEND_GLOBAL_PREFIX}`
  );
}

bootstrap();
