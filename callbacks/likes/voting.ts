import axios from 'axios';

import { LIKE_URL, SERVER_ERROR, responseBody } from '@callbacks/constants';

import {} from '@callbacks/posts/type';
import { NewVoteRequest } from './type';

const instance = axios.create({
  baseURL: LIKE_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR
});

export const votingRequests = {
  updateLikeStatus: (value: number, pid: string) =>
    instance
      .put(`${pid}`, { value: value } as NewVoteRequest)
      .then(responseBody)
      .catch((error) => {
        console.log('error in updating the like status', error);
        return null;
      }),
  getUserLikeStatus: (pid: string) =>
    instance
      .get<number>(`${pid}`)
      .then(responseBody)
      .catch((error) => {
        console.log('error in updating the like status', error);
        return null;
      }),
  getLikeCount: (pid: string) =>
    instance
      .get<number>(`${pid}/count`)
      .then(responseBody)
      .catch((error) => {
        console.log('error in getting the like count', error);
        return null;
      })
};
