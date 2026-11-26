import { ERROR_MESSAGES } from '../config';
import { AppError } from '../errors';

// Devuelve el mensaje de un AppError, o el genérico si el error es desconocido.
export const getErrorMessage = (error: unknown): string =>
  error instanceof AppError ? error.message : ERROR_MESSAGES.unknown;
