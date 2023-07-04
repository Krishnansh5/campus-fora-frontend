import axios from 'axios';

import { FOLLOW_URL, SERVER_ERROR, TOPIC_X_URL, responseBody } from '@callbacks/constants';
import { Answer, Question, ToggleStatus, UserDetails } from '@callbacks/types';
import { id } from 'date-fns/locale';

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
            console.log('error in fetching questions starred by user with id : '+id, error);
            return [] as Question[]
        }),

    toggleQuestionFollowingStatus: () =>
        instance
        .put<ToggleStatus>('/starQuestion')
        .then(responseBody)
        .catch((error) => {
            console.log('Error in getting status of toggling of starred questions: ', error);
        }),
}
