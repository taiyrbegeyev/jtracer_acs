export enum AppErrorType {
  JTracer = 'JTracer',
  INTERNAL = 'INTERNAL',
  NETWORK = 'NETWORK',
  UNKNOWN = 'UNKNOWN'
}

export interface IAppError {
  name?: string;
  type: AppErrorType;
  code: string;
  message: any;
  statusCode: number;
  errors?: any;
  meta?: {
    context: any;
  };
}
