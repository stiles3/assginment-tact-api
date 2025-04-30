import * as dotenv from 'dotenv';
import * as Joi from 'joi';

export enum Env {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

dotenv.config();

export const envConfig = {
  NODE_ENV: process.env.NODE_ENV,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_DIALECT: process.env.DB_DIALECT,
  DB_SCHEMA_NAME: process.env.DB_SCHEMA_NAME,
  CORS_ALLOWED_ORIGINS: process.env.CORS_ALLOWED_ORIGINS,
  CLIENT_FRONTEND_BASE_URL: process.env.CLIENT_FRONTEND_BASE_URL,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USERNAME: process.env.SMTP_USERNAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRY: process.env.JWT_ACCESS_TOKEN_EXPIRY,
  JWT_REFRESH_TOKEN_EXPIRY: process.env.JWT_REFRESH_TOKEN_EXPIRY,
  ENCRYPTION_SECRET_KEY: process.env.ENCRYPTION_SECRET_KEY,
  REDIS_URL: process.env.REDIS_URL,
};

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid(...Object.values(Env))
    .required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_DIALECT: Joi.string().required(),
  DB_SCHEMA_NAME: Joi.string().required(),
  CORS_ALLOWED_ORIGINS: Joi.string().required(),
  CLIENT_FRONTEND_BASE_URL: Joi.string().required(),
  SMTP_HOST: Joi.string().required(),
  SMTP_PORT: Joi.string().required(),
  SMTP_USERNAME: Joi.string().required(),
  SMTP_PASSWORD: Joi.string().required(),
  SMTP_FROM_EMAIL: Joi.string().required(),
  JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_EXPIRY: Joi.string().required(),
  JWT_REFRESH_TOKEN_EXPIRY: Joi.string().required(),
  DEFAULT_ADMIN_FIRST_NAME: Joi.string().required(),
  DEFAULT_ADMIN_LAST_NAME: Joi.string().required(),
  DEFAULT_ADMIN_EMAIL: Joi.string().required(),
  DEFAULT_ADMIN_PASSWORD: Joi.string().required(),
  ENCRYPTION_SECRET_KEY: Joi.string().required(),
  REDIS_URL: Joi.string().required(),
});
