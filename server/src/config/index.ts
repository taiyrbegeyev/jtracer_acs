export default {
  environment: process.env.NODE_ENV || 'development',
  api: {
    version: 'v1',
    access_token_secret: process.env.ACCESS_TOKEN_SECRET || '9kVYklFGLa',
    access_token_life: process.env.ACCESS_TOKEN_LIFE || 60,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET || 'Xdmeh2ed7K',
    refresh_token_life: process.env.REFRESH_TOKEN_LIFE || 86400
  }
};
