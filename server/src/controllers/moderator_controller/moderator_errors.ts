import { AppErrorType } from 'interfaces/app_error';

export const ModeratorErrors = {
  MODERATOR_EXISTS: {
    type: AppErrorType.JTracer,
    code: 'MODERATOR_EXISTS',
    message: 'The moderator already exists.',
    statusCode: 409
  },
  MODERATOR_NOT_EXISTS: {
    type: AppErrorType.JTracer,
    code: 'MODERATOR_NOT_EXISTS',
    message: 'The moderator does not exist.',
    statusCode: 404
  }
};
