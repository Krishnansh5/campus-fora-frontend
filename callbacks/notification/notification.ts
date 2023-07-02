// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

import {
  NOTIFICATION_URL,
  SERVER_ERROR,
  setConfig
} from '@callbacks/constants';

const instance = axios.create({
  baseURL: NOTIFICATION_URL,
  timeout: 15000,
  timeoutErrorMessage: SERVER_ERROR
});

export interface NotificationToken {
  notif_token: string;
  device_id: string;
}

export const notificationRequests = {
  postToken: (token: string, notifToken: string, deviceId: string) =>
    instance
      .post<NotificationToken>(
        '/postToken',
        {
          notif_token: notifToken,
          device_id: deviceId
        } as NotificationToken,
        setConfig(token)
      )
      .then((response) => response.data)
      .catch((error) => {
        console.log('error in posting token', error);
        return null;
      }),
  deleteToken: (token: string, userId: number, deviceId: string) =>
    instance
      .post<NotificationToken>(
        '/deleteToken',
        {
          user_id: userId,
          deviceId: deviceId
        },
        setConfig(token)
      )
      .then((response) => response.data)
      .catch((error) => {
        console.log('error in deleting token', error);
        return null;
      })
};
