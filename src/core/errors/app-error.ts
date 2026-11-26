export enum AppErrorType {
  Network = 'network',
  Http = 'http',
  Unknown = 'unknown',
}

// Error de aplicación tipado con su categoría y el código HTTP opcional.
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
