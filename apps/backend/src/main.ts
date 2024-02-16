/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { BackendConfig } from "@guitar-shop/config";
import { BACKEND_GLOBAL_PREFIX } from "@guitar-shop/consts";
import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(BACKEND_GLOBAL_PREFIX);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Guitar Shop REST API "Backend" service')
    .setDescription('Guitar Shop REST API "Backend" service')
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("spec", app, document);

  app.useGlobalPipes(new ValidationPipe());

  const port = BackendConfig().appPort;
  const host = BackendConfig().host;
  await app.listen(port);
  Logger.log(
    `🚀 Application "Backend" is running on: http://${host}:${port}/${BACKEND_GLOBAL_PREFIX}`
  );
}

bootstrap();
