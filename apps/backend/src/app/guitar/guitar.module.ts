import { BackendConfigModule } from '@guitar-shop/config';
import { JwtAccessStrategy } from '@guitar-shop/core';
import { PrismaClientModule } from '@guitar-shop/models';
import { Module } from '@nestjs/common';

import { GuitarController } from './guitar.controller';
import { GuitarRepository } from './guitar.repository';
import { GuitarService } from './guitar.service';

@Module({
  imports: [PrismaClientModule, BackendConfigModule],
  controllers: [GuitarController],
  providers: [GuitarRepository, GuitarService, JwtAccessStrategy],
})
export class GuitarModule {}
