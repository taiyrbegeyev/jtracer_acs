import { CommonError } from 'config/app_common_errors';
import { AppErrorType } from 'interfaces/app_error';

export const Errors = {
  WRONG_CREDENTIALS: {
    ...CommonError.UNAUTHORIZED,
    code: 'WRONG_CREDENTIALS',
    message: 'The email and/or password are incorrect.'
  },
  MODERATOR_DOES_NOT_EXIST: {
    type: AppErrorType.JTracer,
    code: 'MODERATOR_DOES_NOT_EXIST',
    message: 'The moderator does not exist.',
    statusCode: 404
  },
  MODERATOR_ALREADY_REGISTERED: {
    type: AppErrorType.JTracer,
    code: 'MODERATOR_ALREADY_REGISTERED',
    message: 'The moderator is already registered.',
    statusCode: 409
  },
  EMAIL_ALREADY_TAKEN: {
    type: AppErrorType.JTracer,
    code: 'EMAIL_ALREADY_TAKEN',
    message: 'The given email address is already taken.',
    statusCode: 400
  },
  AUTH_WEAK_PASSWORD: {
    type: AppErrorType.JTracer,
    code: 'AUTH_WEAK_PASSWORD',
    message: 'The given password is easy to guess, provide strong password.',
    statusCode: 400
  }
};
