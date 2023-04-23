import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {config } from './config/config';
import logger from './logger/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  logger.info(`Starting app on port ${config.PORT}`)
  await app.listen(config.PORT);
}

bootstrap();
