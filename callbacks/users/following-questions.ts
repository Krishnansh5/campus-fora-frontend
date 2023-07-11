import axios from 'axios';
import { id } from 'date-fns/locale';

import { Question } from '@callbacks/posts/type';
import { FOLLOW_URL, SERVER_ERROR, responseBody } from '@callbacks/constants';

const instance = axios.create({
  baseURL: FOLLOW_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR
});

export const FollowLandingRequests = {
  getAllUserFollowingQuestions: () =>
    instance
      .get<Question>('/user/starred')
      .then(responseBody)
      .catch((error) => {
        console.log(
          'error in fetching questions starred by user with id : ' + id,
          error
        );
        return [] as Question[];
      })
};
