import { CommonError } from 'config/app_common_errors';
import { AppErrorType } from 'interfaces/app_error';

export const EventErrors = {
  EVENT_NAME_EXISTS: {
    type: AppErrorType.JTracer,
    code: 'EVENT_NAME_EXISTS',
    message: 'The event with such a name already exists.',
    statusCode: 409
  },
  EVENT_NOT_EXISTS: {
    ...CommonError.RESOURCE_NOT_FOUND,
    code: 'EVENT_NOT_EXISTS',
    message: 'The event with such an id does not exist.'
  }
};
