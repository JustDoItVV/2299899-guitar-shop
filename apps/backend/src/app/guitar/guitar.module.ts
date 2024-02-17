import { BackendConfigModule } from '@guitar-shop/config';
import { JwtAccessStrategy } from '@guitar-shop/core';
import { BackendLoggerModule } from '@guitar-shop/logger';
import { PrismaClientModule } from '@guitar-shop/models';
import { Module } from '@nestjs/common';

import { GuitarController } from './guitar.controller';
import { GuitarRepository } from './guitar.repository';
import { GuitarService } from './guitar.service';

@Module({
  imports: [PrismaClientModule, BackendConfigModule, BackendLoggerModule],
  controllers: [GuitarController],
  providers: [GuitarRepository, GuitarService, JwtAccessStrategy],
})
export class GuitarModule {}
