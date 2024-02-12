import * as Joi from 'joi';

import { Environment } from '@guitar-shop/types';
import { registerAs } from '@nestjs/config';

export interface BackendConfig {
  environment: string;
  appPort: number;
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...Object.values(Environment)).required(),
  appPort: Joi.number().port().required(),
});

function validateConfig(config: BackendConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(`[Backend config validation error]: ${error.message}`);
  }
}

function getConfig(): BackendConfig {
  const config: BackendConfig = {
    environment: process.env.NODE_ENV as Environment,
    appPort: parseInt(process.env.APP_PORT, 10),
  };

  validateConfig(config);
  return config;
}

export default registerAs('app', getConfig);
