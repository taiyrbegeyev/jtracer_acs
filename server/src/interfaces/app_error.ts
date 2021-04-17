export enum AppErrorType {
  APP_NAME = 'APP_NAME',
  INTERNAL = 'INTERNAL',
  NETWORK = 'NETWORK',
  UNKNOWN = 'UNKNOWN'
}

export interface IAppError {
  name?: string;
  type?: AppErrorType;
  code?: string;
  message?: any;
  statusCode?: number;
  errors?: any;
  meta?: {
    context: any;
  };
}
