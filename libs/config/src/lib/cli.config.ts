import * as Joi from 'joi';

import { User } from '@guitar-shop/types';
import { registerAs } from '@nestjs/config';

export interface CliConfig {
  defaultUser: User & { password: string };
  uploadDirectory: string;
}

const validationSchema = Joi.object({
  defaultUser: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  uploadDirectory: Joi.string().required(),
});

function validateConfig(config: CliConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(`[CLI config validation error]: ${error.message}`);
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
