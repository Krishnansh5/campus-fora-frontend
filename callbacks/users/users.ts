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
  getUserDetails: (id: number) =>
    instance
      .get<UserDetails>(':'+id)
      .then(responseBody)
      .catch((error) => {
        console.log('error in fetching user with id : '+id, error);
        return {} as UserDetails
      }),

  updateUserDetail: (id: number) =>
    instance
      .put<UserDetails>(':'+id)
      .then(responseBody)
      .catch((error) => {
        console.log('error in updating details of the user with id : '+id, error);
      }),

  updateUserBio: (id: number) =>
    instance
      .put<string>(':'+id + '/bio')
      .then(responseBody)
      .catch((error) => {
        console.log('error in updating bio of the user with id : '+id, error);
      }),

  getAllUserAskedQuestions: (id: number) =>
    instance
      .get<Question>(':'+id+'/questions')
      .then(responseBody)
      .catch((error) => {
        console.log('error in fetching questions for user with id : '+id, error);
        return [] as Question[]
      }),

  getNotifications: (id: number) =>
    instance
    .get<Notification>('/:'+id+'/notification')
    .then(responseBody)
    .catch((error) => {
        console.log('error in fetching notifications for user with id : '+id, error);
        return [] as Notification[]
    }),
}