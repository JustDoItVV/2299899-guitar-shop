import { ENV_FILE_PATH } from '@guitar-shop/consts';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import BackendConfig from './backend.config';
import JwtConfig from './jwt.config';
import MailConfig from './mail.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [BackendConfig, JwtConfig, MailConfig],
      envFilePath: ENV_FILE_PATH,
    }),
  ],
})
export class BackendConfigModule {}
