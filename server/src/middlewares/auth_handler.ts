/* eslint-disable */
import config from 'config';
import { AuthErrors } from 'controllers/auth_controller/auth_errors';
import express from 'express';
import AuthService from 'services/auth_service';
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
      throw new AppError(AuthErrors.NO_ACCESS_TOKEN_PROVIDED);
    }
  } catch (err) {
    return next(createError(err));
  }

  try {
    const decoded = AuthService.decodeJWTtoken(
      accessToken,
      config.auth.access_token_secret
    ) as any;
    res.locals.id = decoded.id;
    res.locals.email = decoded.email;
    res.locals.roles = decoded.roles;
    next();
  } catch (e) {
    return next(createError(AuthErrors.INVALID_ACCESS_TOKEN_PROVIDED));
  }
}
