import dotenv from 'dotenv';

dotenv.config();

export default {
  environment: process.env.NODE_ENV || 'development',
  api: {
    version: 'v1'
  },
  auth: {
    saltRounds: 10,
    access_token_secret: `${process.env.ACCESS_TOKEN_SECRET}`,
    access_token_life: parseInt(`${process.env.ACCESS_TOKEN_LIFE}`),
    refresh_token_secret: `${process.env.REFRESH_TOKEN_SECRET}`,
    refresh_token_life: parseInt(`${process.env.REFRESH_TOKEN_LIFE}`),
    email_token_secret: `${process.env.EMAIL_TOKEN_SECRET}`,
    email_token_life: parseInt(`${process.env.EMAIL_TOKEN_LIFE}`)
  },
  email: {
    mailgun_api_key: `${process.env.MAILGUN_API_KEY}`,
    domain_name: `${process.env.DOMAIN_NAME}`
  },
  event: {
    maxDuration: 720 // in minutes
  }
};
