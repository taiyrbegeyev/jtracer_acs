import { AppErrorType } from 'interfaces/app_error';
import Joi from 'joi';
import { AppError } from './app_error';

function mapJoiValidationError(error: {
  message: any;
  inner: any;
  value: any;
}) {
  return {
    type: AppErrorType.JTracer,
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

  if (!Object.prototype.hasOwnProperty.call(error, 'type')) {
    const payload = {
      type: AppErrorType.JTracer,
      code: error.name,
      message: error.message,
      statusCode: 400
    };
    return new AppError(payload);
  }

  return new AppError(error);
}
