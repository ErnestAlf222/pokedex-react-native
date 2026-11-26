import { ERROR_MESSAGES } from '../config';
import { AppError, AppErrorType } from '../errors';

const request = async (url: string): Promise<Response> => {
  try {
    return await fetch(url);
  } catch {
    throw new AppError(AppErrorType.Network, ERROR_MESSAGES.network);
  }
};

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
