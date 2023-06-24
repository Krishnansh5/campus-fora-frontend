import axios from 'axios';

import { SERVER_ERROR, USER_URL, responseBody } from '@callbacks/constants';
import { Question, UserDetails } from '@callbacks/types';
import { id } from 'date-fns/locale';

const instance = axios.create({
  baseURL: USER_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR
});

export const FollowLandingRequests = {
  getAllUserDetails: (id: number) =>
    instance
      .get<UserDetails>('/api/users/:'+id)
      .then(responseBody)
      .catch((error) => {
        console.log('error in fetching user with id : '+id, error);
        return {} as UserDetails
      }),

  updateUserDetail: (id: number) =>
    instance
      .put<UserDetails>('/api/users/:'+id)
      .then(responseBody)
      .catch((error) => {
        console.log('error in updating details of the user with id : '+id, error);
      }),

  updateUserBio: (id: number) =>
    instance
      .put<string>('/api/users/:'+id + '/bio')
      .then(responseBody)
      .catch((error) => {
        console.log('error in updating bio of the user with id : '+id, error);
      }),

  getAllUserAskedQuestions: (id: number) =>
    instance
      .get<Question>('/api/users/:'+id+'/questions')
      .then(responseBody)
      .catch((error) => {
        console.log('error in fetching questions for user with id : '+id, error);
        return [] as Question[]
      }),
}