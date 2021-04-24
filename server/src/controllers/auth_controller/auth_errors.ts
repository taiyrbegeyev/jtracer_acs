import { CommonError } from 'config/app_common_errors';
import { AppErrorType } from 'interfaces/app_error';

export const AuthErrors = {
  NO_ACCESS_TOKEN_PROVIDED: {
    ...CommonError.UNAUTHORIZED,
    code: 'NO_ACCESS_TOKEN_PROVIDED',
    message: 'No access token provided.'
  },
  INVALID_ACCESS_TOKEN_PROVIDED: {
    ...CommonError.BAD_REQUEST,
    code: 'INVALID_ACCESS_TOKEN_PROVIDED',
    message: 'Invalid access token provided.'
  },
  WRONG_CREDENTIALS: {
    ...CommonError.UNAUTHORIZED,
    code: 'WRONG_CREDENTIALS',
    message: 'The email and/or password are incorrect.'
  },
  MODERATOR_ACCESS_DENIED: {
    ...CommonError.FORBIDDEN,
    code: 'MODERATOR_ACCESS_DENIED',
    message: 'Access denied.'
  },
  AUTH_WEAK_PASSWORD: {
    type: AppErrorType.JTracer,
    code: 'AUTH_WEAK_PASSWORD',
    message: 'The given password is easy to guess, provide strong password.',
    statusCode: 400
  }
};
