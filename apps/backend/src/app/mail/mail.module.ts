import { BackendConfigModule } from '@guitar-shop/config';
import { getMailerAsyncOptions } from '@guitar-shop/helpers';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

import { MailService } from './mail.service';

@Module({
  imports: [
    BackendConfigModule,
    MailerModule.forRootAsync(getMailerAsyncOptions('mail.mail')),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
