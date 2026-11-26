import { ERROR_MESSAGES } from '../config';
import { AppError, AppErrorType } from '../errors';

// Ejecuta el fetch y traduce los fallos de conexión a un AppError de red.
const request = async (url: string): Promise<Response> => {
  try {
    return await fetch(url);
  } catch {
    throw new AppError(AppErrorType.Network, ERROR_MESSAGES.network);
  }
};

// Hace un GET y devuelve el JSON tipado, lanzando AppError ante cualquier fallo.
export const getJson = async <T>(url: string): Promise<T> => {
  const response = await request(url);
  if (!response.ok) {
    throw new AppError(AppErrorType.Http, ERROR_MESSAGES.http, response.status);
  }
  try {
    return (await response.json()) as T;
  } catch {
    throw new AppError(AppErrorType.Unknown, ERROR_MESSAGES.unknown);
  }
};
