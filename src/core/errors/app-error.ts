export enum AppErrorType {
  Network = 'network',
  Http = 'http',
  Unknown = 'unknown',
}

export class AppError extends Error {
  constructor(
    readonly type: AppErrorType,
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = 'AppError';
  }
}
