import 'firebase/messaging';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  Messaging,
  getMessaging,
  getToken,
  onMessage
} from 'firebase/messaging';

import { notificationRequests } from '@callbacks/notification/notification';
import { showNotification } from '@components/notifications/notification-toast';

import { FirebaseConfig } from './config';

export class FirebaseCloudMessaging {
  firebaseApp: FirebaseApp;

  messaging: Messaging;

  init = async () => {
    this.firebaseApp = initializeApp(FirebaseConfig);
    this.messaging = getMessaging(this.firebaseApp);
    try {
      onMessage(this.messaging, (payload) => {
        console.log('Message received. ', payload);
        showNotification(payload.notification, payload.fcmOptions.link);
      });
    } catch (err) {
      console.log(err);
    }
  };

  saveNotifToken = async (token: string, userId: number, deviceId: string) => {
    const notifToken = await getToken(this.messaging, {
      vapidKey:
        'BOVbblVYLwM7XJzetjXoBPG0TghBD9LGiePj78XmMR-LRWwc0FpuqhXHDmPUItZrqbRTQTrs23nE_kojV73lHU8'
    })
      .then(async (notificationToken) => {
        if (notificationToken) {
          const res = await notificationRequests.postToken(
            token,
            notificationToken,
            deviceId
          );
          if (res !== null) {
            console.log('currentToken', notificationToken);
            return notificationToken;
          } else {
            return '';
          }
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
          return '';
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        return '';
      });
    return notifToken;
  };

  deleteNotificatoionToken = async (
    token: string,
    userId: number,
    deviceId: string
  ) => {
    return notificationRequests.deleteToken(token, userId, deviceId);
  };
}
