import { AppErrorType, IAppError } from 'interfaces/app_error';

export class AppError extends Error {
  name: string;

  type: AppErrorType;

  code: string;

  message: any;

  statusCode: number;

  errors: any;

  meta: any;

  constructor(options: IAppError) {
    super();
    Object.setPrototypeOf(this, AppError.prototype);
    if (!Object.keys(AppErrorType).includes(options.type?.toString())) {
      throw new Error(`ApplicationError: ${options.type} is not a valid type.`);
    }

    if (!options.message) {
      throw new Error('ApplicationError: error message required.');
    }

    if (!options.code) {
      throw new Error('ApplicationError: error code required.');
    }

    this.name = 'ApplicationError';
    this.type = options.type;
    this.code = options.code;
    this.message = options.message;
    this.statusCode = options.statusCode;
    this.errors = options.errors;
    this.meta = options.meta;
  }
}
