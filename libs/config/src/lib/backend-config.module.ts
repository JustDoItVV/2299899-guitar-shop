import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ENV_FILE_PATH } from '../const';
import backendConfig from './backend.config';
import jwtConfig from './jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [backendConfig, jwtConfig],
      envFilePath: ENV_FILE_PATH,
    }),
  ],
})
export class BackendConfigModule {}
