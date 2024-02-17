import * as Joi from 'joi';

import { logger } from '@guitar-shop/logger';
import { registerAs } from '@nestjs/config';

export interface BackendConfig {
  host: string;
  appPort: number;
  uploadDirectory: string;
}

const validationSchema = Joi.object({
  host: Joi.string().required().label('HOST'),
  appPort: Joi.number().port().required().label('BACKEND_PORT'),
  uploadDirectory: Joi.string().required().label('UPLOAD_DIRECTORY_PATH'),
});

function validateConfig(config: BackendConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    const message = `[Backend config validation error]: ${error.message}`;
    logger.error(message, { context: 'Backend API' });
    process.exit(1);
  }
}

function getConfig(): BackendConfig {
  const config: BackendConfig = {
    host: process.env.HOST,
    appPort: parseInt(process.env.BACKEND_PORT, 10),
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
  };

  validateConfig(config);
  return config;
}

export default registerAs('app', getConfig);
