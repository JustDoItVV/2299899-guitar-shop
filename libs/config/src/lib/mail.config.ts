import * as Joi from 'joi';

import { registerAs } from '@nestjs/config';

export interface MailConfig {
  mail: {
    host: string;
    port: number;
    user: string;
    password: string;
    from: string;
  };
}

const validationSchema = Joi.object({
  mail: Joi.object({
    host: Joi.string().required(),
    port: Joi.number().port().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    from: Joi.string().required(),
  }),
});

function validateConfig(config: MailConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(`[Mail config validation error]: ${error.message}`);
  }
}

function getConfig(): MailConfig {
  const config: MailConfig = {
    mail: {
      host: process.env.MAIL_SMTP_HOST,
      port: parseInt(process.env.MAIL_SMTP_PORT, 10),
      user: process.env.MAIL_USER_NAME,
      password: process.env.MAIL_USER_PASSWORD,
      from: process.env.MAIL_FROM,
    },
  };

  validateConfig(config);
  return config;
}

export default registerAs('mail', getConfig);
