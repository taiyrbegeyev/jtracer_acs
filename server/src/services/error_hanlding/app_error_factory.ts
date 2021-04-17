import { AppErrorType } from 'interfaces/app_error';
import Joi from 'joi';
import { AppError } from './app_error';

function mapJoiValidationError(error: {
  message: any;
  inner: any;
  value: any;
}) {
  return {
    type: AppErrorType.APP_NAME,
    code: 'VALIDATION_ERROR',
    message: error.message,
    errors: error.inner,
    statusCode: 400,
    meta: {
      context: error.value
    }
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createError(error: any): AppError {
  const isJoiError = error instanceof Joi.ValidationError;
  if (isJoiError) {
    const joiError = mapJoiValidationError(error);
    return new AppError(joiError);
  }
  return new AppError(error);
}
