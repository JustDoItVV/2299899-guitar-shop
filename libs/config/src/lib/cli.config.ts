import * as Joi from 'joi';

import { logger } from '@guitar-shop/logger';
import { User } from '@guitar-shop/types';
import { registerAs } from '@nestjs/config';

export interface CliConfig {
  defaultUser: User & { password: string };
  uploadDirectory: string;
}

const validationSchema = Joi.object({
  defaultUser: Joi.object({
    name: Joi.string().required().label('DEFAULT_USER_NAME'),
    email: Joi.string().required().label('DEFAULT_USER_EMAIL'),
    password: Joi.string().required().label('DEFAULT_USER_PASSWORD'),
  }),
  uploadDirectory: Joi.string().required().label('UPLOAD_DIRECTORY_PATH'),
});

function validateConfig(config: CliConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    const message = `[CLI config validation error]: ${error.message}`;
    logger.error(message, { context: 'CLI' });
    process.exit(1);
  }
}

function getConfig(): CliConfig {
  const config: CliConfig = {
    defaultUser: {
      name: process.env.DEFAULT_USER_NAME,
      email: process.env.DEFAULT_USER_EMAIL,
      password: process.env.DEFAULT_USER_PASSWORD,
    },
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
  };

  validateConfig(config);
  return config;
}

export default registerAs('app', getConfig);
