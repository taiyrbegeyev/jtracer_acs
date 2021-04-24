/* eslint-disable */
import { AuthErrors } from 'controllers/auth_controller/auth_errors';
import express from 'express';
import { Role } from 'models/moderators';
import { createError } from 'services/error_hanlding/app_error_factory';

export function viewer(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!res.locals.role.includes(Role.Viewer))
    return next(createError(AuthErrors.MODERATOR_ACCESS_DENIED));

  next();
}

export function locationManager(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!res.locals.role.includes(Role.LocationManager))
    return next(createError(AuthErrors.MODERATOR_ACCESS_DENIED));

  next();
}

export function eventManager(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!res.locals.role.includes(Role.EventManager))
    return next(createError(AuthErrors.MODERATOR_ACCESS_DENIED));

  next();
}

export function moderatorManager(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!res.locals.role.includes(Role.ModeratorManager))
    return next(createError(AuthErrors.MODERATOR_ACCESS_DENIED));

  next();
}

export function logManager(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!res.locals.role.includes(Role.LogManager))
    return next(createError(AuthErrors.MODERATOR_ACCESS_DENIED));

  next();
}

export function infectionReportManager(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!res.locals.role.includes(Role.InfectionReportManager))
    return next(createError(AuthErrors.MODERATOR_ACCESS_DENIED));

  next();
}
