/* eslint-disable */
import { CommonError } from 'config/app_common_errors';

export const EventErrors = {
  EVENT_NAME_NOT_EXISTS: {
    ...CommonError.RESOURCE_NOT_FOUND,
    code: 'EVENT_NAME_NOT_EXISTS',
    message: 'The event with such an id does not exist.'
  }
};
