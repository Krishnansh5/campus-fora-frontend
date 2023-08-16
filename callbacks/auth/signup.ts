// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import axios from 'axios';

import {
  AUTH_URL,
  ErrorType,
  SERVER_ERROR,
  responseBody
} from '@callbacks/constants';

import { SignupParams, SignupResponse, VerifyEmailResponse } from './types';

const authInstance = axios.create({
  baseURL: AUTH_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR
});

const signup = {
  post: (data: SignupParams) =>
    authInstance
      .post<SignupResponse>('/signup', data)
      .then(responseBody)
      .catch((err: ErrorType) => {
        console.error(
          'Error in signup',
          err?.response?.data?.error || err?.message
        );
        return null;
      }),
  verify: (verificationCode: string) =>
    authInstance
      .get(`/verifyemail/${verificationCode}`)
      .then(responseBody)
      .catch((err: ErrorType) => {
        console.log(err)
        console.error(
          'Error in verifying email',
          err?.response?.data?.error || err?.message
        );
        return err?.response?.data;
      })
};

export default signup;
