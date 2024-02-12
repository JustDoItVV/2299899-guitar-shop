import * as Joi from 'joi';

import { Environment, User } from '@guitar-shop/types';
import { registerAs } from '@nestjs/config';

export interface CliConfig {
  environment: string;
  defaultUser: User & { password: string };
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...Object.values(Environment)).required(),
  defaultUser: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

function validateConfig(config: CliConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(`[CLI config validation error]: ${error.message}`);
  }
}

function getConfig(): CliConfig {
  const config: CliConfig = {
    environment: process.env.NODE_ENV as Environment,
    defaultUser: {
      name: process.env.DEFAULT_USER_NAME,
      email: process.env.DEFAULT_USER_EMAIL,
      password: process.env.DEFAULT_USER_PASSWORD,
    }
  };

  validateConfig(config);
  return config;
}

export default registerAs('app', getConfig);
