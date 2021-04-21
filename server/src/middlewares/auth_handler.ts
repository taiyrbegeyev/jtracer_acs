/* eslint-disable */
import config from 'config';
import { Errors } from 'controllers/authController/auth_errors';
import express from 'express';
import AuthServices from 'services/auth_service';
import { AppError } from 'services/error_hanlding/app_error';
import { createError } from 'services/error_hanlding/app_error_factory';

export function authHandler(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  let accessToken;
  try {
    accessToken = req.cookies.accessToken;
    if (!accessToken) {
      throw new AppError(Errors.NO_ACCESS_TOKEN_PROVIDED);
    }
  } catch (err) {
    return next(createError(err));
  }

  try {
    const decoded = AuthServices.decodeJWTtoken(
      accessToken,
      config.auth.access_token_secret
    ) as any;
    res.locals.id = decoded.id;
    res.locals.email = decoded.email;
    res.locals.roles = decoded.roles;
    next();
  } catch (e) {
    return next(createError(Errors.INVALID_ACCESS_TOKEN_PROVIDED));
  }
}
