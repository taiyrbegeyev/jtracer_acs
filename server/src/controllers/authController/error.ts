import { AppErrorType } from 'interfaces/app_error';

export const Errors = {
  EMAIL_ALREADY_TAKEN: {
    type: AppErrorType.APP_NAME,
    code: 'EMAIL_ALREADY_TAKEN',
    message: 'The given email address is already taken :(',
    statusCode: 400
  },
  AUTH_WEAK_PASSWORD: {
    type: AppErrorType.APP_NAME,
    code: 'AUTH_WEAK_PASSWORD',
    message: 'The given password is easy to guess, provide strong password',
    statusCode: 400
  }
};
