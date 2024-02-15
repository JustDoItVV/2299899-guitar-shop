import { BackendConfigModule } from '@guitar-shop/config';
import { Module } from '@nestjs/common';

import { GuitarModule } from './guitar/guitar.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [BackendConfigModule, UserModule, GuitarModule],
})
export class AppModule {}
