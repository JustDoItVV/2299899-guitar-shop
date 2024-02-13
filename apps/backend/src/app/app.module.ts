import { BackendConfigModule } from '@guitar-shop/config';
import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';

@Module({
  imports: [
    BackendConfigModule,
    UserModule,
  ],
})
export class AppModule {}
