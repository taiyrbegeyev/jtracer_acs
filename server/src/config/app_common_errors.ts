import { AppErrorType } from 'interfaces/app_error';

const CommonError = {
  // Application custom errors
  UNKNOWN_ERROR: {
    type: AppErrorType.APP_NAME,
    code: 'UNKNOWN_ERROR',
    message: 'Unknown error',
    statusCode: 500
  },

  // Predefined 4xx http errors
  BAD_REQUEST: {
    type: AppErrorType.NETWORK,
    code: 'BAD_REQUEST',
    message: 'Bad request',
    statusCode: 400
  },
  UNAUTHORIZED: {
    type: AppErrorType.NETWORK,
    code: 'UNAUTHORIZED',
    message: 'Unauthorized',
    statusCode: 401
  },
  FORBIDDEN: {
    type: AppErrorType.NETWORK,
    code: 'FORBIDDEN',
    message: 'Forbidden',
    statusCode: 403
  },
  RESOURCE_NOT_FOUND: {
    type: AppErrorType.NETWORK,
    code: 'RESOURCE_NOT_FOUND',
    message: 'Resource not found',
    statusCode: 404,
    meta: {
      translationKey: 'app.common.error.RESOURCE_NOT_FOUND'
    }
  },

  // Predefined 5xx http errors
  INTERNAL_SERVER_ERROR: {
    type: AppErrorType.NETWORK,
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Something went wrong, Please try again later.',
    statusCode: 500,
    meta: {
      shouldRedirect: true
    }
  },
  BAD_GATEWAY: {
    type: AppErrorType.NETWORK,
    code: 'BAD_GATEWAY',
    message: 'Bad gateway',
    statusCode: 502
  },
  SERVICE_UNAVAILABLE: {
    type: AppErrorType.NETWORK,
    code: 'SERVICE_UNAVAILABLE',
    message: 'Service unavailable',
    statusCode: 503
  },
  GATEWAY_TIMEOUT: {
    type: AppErrorType.NETWORK,
    code: 'GATEWAY_TIMEOUT',
    message: 'Gateway timeout',
    statusCode: 504
  }
};

export { CommonError };
