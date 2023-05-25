import axios, { AxiosResponse } from 'axios';

import { SERVER_ERROR, TOPIC_X_URL, responseBody } from '@callbacks/constants';
import { QuestionDetails } from '@callbacks/types';

const instance = axios.create({
  baseURL: TOPIC_X_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR
});

export const TopicXLandingRequests = {
  getAll: () =>
    instance
      .get<QuestionDetails[]>('/landing')
      .then(responseBody)
      .catch((error) => {
        console.log('error in fetching questions for topic X', error);
        return [] as QuestionDetails[];
      }),
  getLimited: (limit: number) =>
    instance
      .get<QuestionDetails[]>(`/landing?limit=${limit}`)
      .then(responseBody)
      .catch((error) => {
        console.log('error in fetching questions for topic X', error);
        return [] as QuestionDetails[];
      })
};
