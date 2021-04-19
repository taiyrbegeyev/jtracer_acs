import express from 'express';
import { log } from 'utils/logger';
import { CommonError } from '../config/app_common_errors';
import { AppError } from '../services/error_hanlding/app_error';
import { createError } from '../services/error_hanlding/app_error_factory';
import {
  formatError,
  sendResponse
} from '../services/error_hanlding/app_response_schema';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function errorHandler(
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  err: any,
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: express.NextFunction
) {
  log.error(err);

  if (err instanceof AppError) {
    const code = err.statusCode || 500;
    return res.status(code).json(formatError(err));
  }

  if (err instanceof Error) {
    const newError = createError(err);
    const code = newError.statusCode || 500;
    return res.status(code).json(formatError(newError));
  }

  const unknownError = new AppError(CommonError.UNKNOWN_ERROR);

  return sendResponse(res, unknownError, unknownError.statusCode);
}
