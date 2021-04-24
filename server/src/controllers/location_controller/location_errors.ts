/* eslint-disable */
import { CommonError } from 'config/app_common_errors';
import { AppErrorType } from 'interfaces/app_error';

export const LocationErrors = {
  LOCATION_NAME_EXISTS: {
    type: AppErrorType.JTracer,
    code: 'LOCATION_NAME_EXISTS',
    message: 'The location with such a name already exists.',
    statusCode: 409
  },
  LOCATION_NOT_EXISTS: {
    ...CommonError.RESOURCE_NOT_FOUND,
    code: 'LOCATION_NOT_EXISTS',
    message: 'The location with such an id does not exist.'
  }
};
