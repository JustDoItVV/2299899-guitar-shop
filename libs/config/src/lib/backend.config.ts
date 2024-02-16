import * as Joi from 'joi';

import { Environment } from '@guitar-shop/types';
import { registerAs } from '@nestjs/config';

export interface BackendConfig {
  environment: string;
  host: string;
  appPort: number;
  uploadDirectory: string;
}

const validationSchema = Joi.object({
  environment: Joi.string()
    .valid(...Object.values(Environment))
    .required(),
  host: Joi.string().required(),
  appPort: Joi.number().port().required(),
  uploadDirectory: Joi.string().required(),
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
    host: process.env.HOST,
    appPort: parseInt(process.env.BACKEND_PORT, 10),
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
  };

  validateConfig(config);
  return config;
}

export default registerAs('app', getConfig);
