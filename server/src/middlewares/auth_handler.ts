/* eslint-disable */
import config from 'config';
import { Errors } from 'controllers/authController/auth_errors';
import express from 'express';
import { Role } from 'models/moderators';
import AuthServices from 'services/auth_service';
import { createError } from 'services/error_hanlding/app_error_factory';

export function authHandler(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return next(createError(Errors.NO_ACCESS_TOKEN_PROVIDED));
  }

  try {
    const decoded = AuthServices.decodeJWTtoken(
      accessToken,
      config.auth.email_token_secret
    ) as any;
    res.locals.id = decoded.id;
    res.locals.email = decoded.email;
    res.locals.roles = decoded.roles;
    next();
  } catch (e) {
    return next(createError(Errors.INVALID_ACCESS_TOKEN_PROVIDED));
  }
}

export function viewer(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!res.locals.role.includes(Role.Viewer))
    return next(createError(Errors.MODERATOR_ACCESS_DENIED));

  next();
}

export function locationManager(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!res.locals.role.includes(Role.LocationManager))
    return next(createError(Errors.MODERATOR_ACCESS_DENIED));

  next();
}

export function eventManager(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!res.locals.role.includes(Role.EventManager))
    return next(createError(Errors.MODERATOR_ACCESS_DENIED));

  next();
}

export function moderatorManager(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!res.locals.role.includes(Role.ModeratorManager))
    return next(createError(Errors.MODERATOR_ACCESS_DENIED));

  next();
}

export function logManager(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!res.locals.role.includes(Role.LogManager))
    return next(createError(Errors.MODERATOR_ACCESS_DENIED));

  next();
}

export function infectionReportManager(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!res.locals.role.includes(Role.InfectionReportManager))
    return next(createError(Errors.MODERATOR_ACCESS_DENIED));

  next();
}
