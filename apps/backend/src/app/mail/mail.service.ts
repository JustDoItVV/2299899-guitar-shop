import { MailConfig } from '@guitar-shop/config';
import { EmailSubject, EmailTemplate, LOGIN_URL } from '@guitar-shop/consts';
import { User } from '@guitar-shop/types';
import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

interface UserWithPassword extends User {
  password: string;
}

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(MailConfig.KEY)
    private readonly mailConfig: ConfigType<typeof MailConfig>
  ) {}

  public async sendRegisterSuccessMail(user: UserWithPassword): Promise<void> {
    await this.mailerService.sendMail({
      from: this.mailConfig.mail.from,
      to: user.email,
      subject: EmailSubject.RegisterSuccess,
      template: EmailTemplate.RegisterSuccess,
      context: {
        name: `${user.name}`,
        email: `${user.email}`,
        password: `${user.password}`,
        loginUrl: `${LOGIN_URL}`,
      },
    });
  }
}
