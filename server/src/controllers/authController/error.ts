import { CommonError } from 'config/app_common_errors';
import { AppErrorType } from 'interfaces/app_error';

export const Errors = {
  WRONG_CREDENTIALS: {
    ...CommonError.UNAUTHORIZED,
    message: 'The email and/or password are incorrect.'
  },
  EMAIL_ALREADY_TAKEN: {
    type: AppErrorType.JTracer,
    code: 'EMAIL_ALREADY_TAKEN',
    message: 'The given email address is already taken :(',
    statusCode: 400
  },
  AUTH_WEAK_PASSWORD: {
    type: AppErrorType.JTracer,
    code: 'AUTH_WEAK_PASSWORD',
    message: 'The given password is easy to guess, provide strong password',
    statusCode: 400
  }
};
