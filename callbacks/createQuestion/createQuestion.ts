import axios from 'axios';

import { Tags } from '@callbacks/posts/type';
import { POST_URL, SERVER_ERROR, responseBody } from '@callbacks/constants';
import {} from '@callbacks/posts/type';

const instance = axios.create({
  baseURL: POST_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR
});

export const createQuestionRequests = {
  getAllTags: (tid: number) =>
    instance
      .get<Tags[]>(`/topic/${tid}/tags`)
      .then(responseBody)
      .catch((error) => {
        console.log('error in getting all tags', error);
        return [] as Tags[];
      })
};
