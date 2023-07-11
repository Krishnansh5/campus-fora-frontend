import axios from 'axios';

import { Question } from '@callbacks/posts/type';
import { LIKE_URL, SERVER_ERROR, responseBody } from '@callbacks/constants';

const instance = axios.create({
  baseURL: LIKE_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR
});

export const LikeLandingRequests = {
  getAllUserLikedQuestions: (id: number) =>
    instance
      .get<Question>('user/liked')
      .then(responseBody)
      .catch((error) => {
        console.log(
          'error in fetching questions liked by user with id : ' + id,
          error
        );
        return [] as Question[];
      })
};
