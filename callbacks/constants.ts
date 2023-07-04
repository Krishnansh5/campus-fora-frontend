import { AxiosError, AxiosResponse } from 'axios';

export const BASE_URL = 'http://172.18.0.4:8082';

export const AUTH_URL = `${BASE_URL}/api/auth`;
export const USER_URL = `${BASE_URL}/api/users`
export const FOLLOW_URL = `${BASE_URL}/api/following`
export const LIKE_URL = `${BASE_URL}/api/likes`

export const TOPIC_X_URL = `${BASE_URL}/api/TOPIC-X`;
export const TOPIC_Y_URL = `${BASE_URL}/api/TOPIC-Y`;
export const TOPIC_Z_URL = `${BASE_URL}/api/TOPIC-Z`;

export const NOTIFICATION_URL = `${BASE_URL}/notif`;

export const CDN_URL = `${BASE_URL}/cdn`;

export const SERVER_ERROR = 'Aw, Snap! Server maybe down.';

export interface ErrorResponse {
  error: string;
}
export interface StatusResponse {
  status: string;
}

export const setConfig = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const responseBody = <T>(response: AxiosResponse<T>) => response.data;
export type ErrorType = AxiosError<ErrorResponse>;
