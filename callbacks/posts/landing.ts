import axios from 'axios';

import { POST_URL, SERVER_ERROR, responseBody } from '@callbacks/constants';
import { Question } from '@callbacks/posts/type';

const instance = axios.create({
  baseURL: POST_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR
});

export const LandingRequests = {
  getAll: () =>
    instance
      .get<Question[]>('/landing')
      .then(responseBody)
      .catch((error) => {
        console.log('error in fetching questions for topic X', error);
        return [] as Question[];
      }),

  getLimited: (limit: number) =>
    instance
      .get<Question[]>(`/landing?limit=${limit}`)
      .then(responseBody)
      .catch((error) => {
        console.log('error in fetching questions for topic X', error);
        return [] as Question[];
      }),

  getAllQuestions: () =>
    instance
      .get<Question[]>('/question')
      .then(responseBody)
      .catch((error) => {
        console.log('error in fetching questions', error);
        return [] as Question[];
      }),

  getLimitedQuestions: (limit: number) =>
    instance
      .get<Question[]>(`/question?limit=${limit}`)
      .then(responseBody)
      .catch((error) => {
        console.log('error in fetching questions', error);
        return [] as Question[];
      })
};
