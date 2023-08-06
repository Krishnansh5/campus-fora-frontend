// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import axios, { AxiosResponse } from 'axios';

import {
  AUTH_URL,
  ErrorType,
  SERVER_ERROR,
  responseBody,
  setConfig
} from '@callbacks/constants';

import { RefreshResponse, WhoamiResponse } from './types';

const authInstance = axios.create({
  baseURL: AUTH_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR
});

const whoami = {
  get: (token: string) =>
    authInstance
      .get<WhoamiResponse>('/whoami', setConfig(token))
      .then(responseBody)
      .catch((err: ErrorType) => {
        if (err.response?.status === 401) {
          return null;
        }
        console.error(
          'Error in fetching user details',
          err?.response?.data?.error || err?.message
        );
        return null;
      }),
  refreshToken: () =>
    authInstance
      .get<RefreshResponse>('/refresh')
      .then(responseBody)
      .catch((err: ErrorType) => {
        console.error(
          'Error in refreshing token',
          err?.response?.data?.error || err?.message
        );
        return null;
      })
};

export default whoami;
