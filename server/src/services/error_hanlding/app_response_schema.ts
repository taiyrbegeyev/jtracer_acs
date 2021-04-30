import express from 'express';
import { AppError } from './app_error';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function formatError(error: AppError, overrides = {}) {
  // `Error.stack`'s `enumerable` property descriptor is `false`
  // Thus, `JSON.stringify(...)` doesn't enumerate over it.
  const stackTrace: any = JSON.stringify(error, ['stack'], 4) || {};
  const newError = JSON.parse(JSON.stringify(error));

  // No need to send to client
  newError.statusCode = undefined;
  delete newError.meta;

  return {
    error: {
      ...newError,
      stack: stackTrace.stack
    },
    success: false,
    ...overrides
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function formatResponse(result: any, override = {}) {
  return {
    data: result,
    success: true,
    ...override
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function sendResponse(
  res: express.Response,
  payload: any,
  statusCode = 200
) {
  return res.status(statusCode).json(formatResponse(payload));
}
