import * as Joi from "joi";

import { logger } from "@guitar-shop/logger";
import { registerAs } from "@nestjs/config";

export interface JWTConfig {
  accessTokenSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenSecret: string;
  refreshTokenExpiresIn: string;
}

const validationSchema = Joi.object({
  accessTokenSecret: Joi.string().required().label("JWT_ACCESS_TOKEN_SECRET"),
  accessTokenExpiresIn: Joi.string()
    .required()
    .label("JWT_ACCESS_TOKEN_EXPIRES_IN"),
  refreshTokenSecret: Joi.string().required().label("JWT_REFRESH_TOKEN_SECRET"),
  refreshTokenExpiresIn: Joi.string()
    .required()
    .label("JWT_REFRESH_TOKEN_EXPIRES_IN"),
});

function validateConfig(config: JWTConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    const message = `[JWTConfig Validation Error]: ${error.message}`;
    logger.error(message, { context: "Backend API" });
    process.exit(1);
  }
}

function getConfig(): JWTConfig {
  const config: JWTConfig = {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  };

  validateConfig(config);
  return config;
}

export default registerAs("jwt", getConfig);
