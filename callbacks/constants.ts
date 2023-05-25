import { AxiosError, AxiosResponse } from 'axios';

export const BASE_URL = 'localhost:8080';

export const AUTH_URL = `${BASE_URL}/auth`;

export const TOPIC_X_URL = `${BASE_URL}/TOPIC-X`;
export const TOPIC_Y_URL = `${BASE_URL}/TOPIC-Y`;
export const TOPIC_Z_URL = `${BASE_URL}/TOPIC-Z`;

export const NOTIFICATION_URL = `${BASE_URL}/notification`;

export const CDN_URL = `${BASE_URL}/cdn`;

export const SERVER_ERROR = 'Aw, Snap! Server maybe down.';

export interface ErrorResponse {
  error: string;
}
export interface StatusResponse {
  status: string;
}

export const responseBody = <T>(response: AxiosResponse<T>) => response.data;
export type ErrorType = AxiosError<ErrorResponse>;
