/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { BackendConfig } from '@guitar-shop/config';
import { BACKEND_GLOBAL_PREFIX } from '@guitar-shop/consts';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(BACKEND_GLOBAL_PREFIX);

  app.useGlobalPipes(new ValidationPipe());

  const port = BackendConfig().appPort;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${BACKEND_GLOBAL_PREFIX}`
  );
}

bootstrap();
