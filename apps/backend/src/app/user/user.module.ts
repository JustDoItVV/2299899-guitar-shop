import { getJwtOptions } from '@guitar-shop/config';
import { AnonymousStrategy, JwtAccessStrategy } from '@guitar-shop/core';
import { PrismaClientModule } from '@guitar-shop/models';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { JwtRefreshStrategy } from './refresh-token/jwt-refresh.strategy';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    PrismaClientModule,
    RefreshTokenModule,
    JwtModule.registerAsync({ inject: [ConfigService], useFactory: getJwtOptions }),
  ],
  controllers: [
    UserController,
  ],
  providers: [
    UserRepository,
    UserService,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    AnonymousStrategy,
  ],
})
export class UserModule {}
