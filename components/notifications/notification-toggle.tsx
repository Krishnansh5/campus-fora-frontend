import React from 'react';
import Switch from '@mui/material/Switch';

import { FCM } from 'pages/_app';
import useStore from '@/store/store';

export default function NotifToggle() {
  const {
    receiveNotification,
    setReceiveNotification,
    token,
    userID,
    setNotificationToken
  } = useStore();

  const handleSubscribe = async () => {
    console.log('saving new notification token');
    await FCM.saveNotifToken(
      token,
      userID,
      localStorage.getItem('deviceId')
    ).then((res) => {
      setNotificationToken(res);
      if (res !== '') {
        setReceiveNotification(true);
      } else {
        setReceiveNotification(false);
      }
    });
    console.log(token);
    if (
      Notification.permission === 'granted' &&
      token !== undefined &&
      token !== '' &&
      userID !== undefined &&
      userID !== 0 &&
      localStorage.getItem('deviceId') !== null &&
      localStorage.getItem('deviceId') !== ''
    ) {
      console.log('saving new notification token');
      await FCM.saveNotifToken(
        token,
        userID,
        localStorage.getItem('deviceId')
      ).then((res) => {
        setNotificationToken(res);
        if (res !== '') {
          setReceiveNotification(true);
        }
      });
    } else {
      console.log('error occoured while subscribing to notifications');
    }
  };

  const handleUnsubscribe = async () => {
    await FCM.deleteNotificatoionToken(
      token,
      userID,
      localStorage.getItem('deviceId')
    ).then((res) => {
      if (res !== null) {
        setReceiveNotification(false);
        setNotificationToken('');
      } else {
        setReceiveNotification(true);
      }
    });
    if (
      token !== undefined &&
      token !== '' &&
      userID !== undefined &&
      userID !== 0 &&
      localStorage.getItem('deviceId') !== null &&
      localStorage.getItem('deviceId') !== ''
    ) {
      await FCM.deleteNotificatoionToken(
        token,
        userID,
        localStorage.getItem('deviceId')
      ).then((res) => {
        if (res !== null) {
          setReceiveNotification(false);
          setNotificationToken('');
        }
      });
    } else {
      console.log('error occoured while unsubscribing to notifications');
    }
  };

  return (
    <Switch
      checked={receiveNotification}
      onClick={() => {
        if (receiveNotification) {
          handleUnsubscribe();
        } else {
          handleSubscribe();
        }
      }}
    />
  );
}
