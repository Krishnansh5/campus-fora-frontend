import axios from 'axios';

import { FOLLOW_URL, LIKE_URL, SERVER_ERROR, TOPIC_X_URL, responseBody } from '@callbacks/constants';
import { Answer, Question, UserDetails } from '@callbacks/types';
import { id } from 'date-fns/locale';

const instance = axios.create({
  baseURL: LIKE_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR
});

export const LikeLandingRequests = {
    getAllUserLikedQuestions: (id: number) =>
    instance
      .get<Question>('/api/likes/user/liked')
      .then(responseBody)
      .catch((error) => {
        console.log('error in fetching questions liked by user with id : '+id, error);
        return [] as Question[]
      }),
}