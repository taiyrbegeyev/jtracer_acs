/* eslint-disable */
import { AuthErrors } from 'controllers/auth_controller/auth_errors';
import express from 'express';
import { Role } from 'models/moderators';
import { createError } from 'services/error_hanlding/app_error_factory';

export function viewer(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!res.locals.role.includes(Role.Viewer))
    return next(createError(AuthErrors.MODERATOR_ACCESS_DENIED));

  next();
}

export function locationManager(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!res.locals.role.includes(Role.LocationManager))
    return next(createError(AuthErrors.MODERATOR_ACCESS_DENIED));

  next();
}

export function eventManager(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!res.locals.role.includes(Role.EventManager))
    return next(createError(AuthErrors.MODERATOR_ACCESS_DENIED));

  next();
}

export function moderatorManager(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!res.locals.role.includes(Role.ModeratorManager))
    return next(createError(AuthErrors.MODERATOR_ACCESS_DENIED));

  next();
}

export function logManager(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!res.locals.role.includes(Role.LogManager))
    return next(createError(AuthErrors.MODERATOR_ACCESS_DENIED));

  next();
}

export function infectionReportManager(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!res.locals.role.includes(Role.InfectionReportManager))
    return next(createError(AuthErrors.MODERATOR_ACCESS_DENIED));

  next();
}
