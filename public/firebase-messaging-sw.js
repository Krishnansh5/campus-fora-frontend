/* eslint-disable @typescript-eslint/no-var-requires */
// import { initializeApp } from 'firebase/app';
// import { getMessaging, onMessage } from 'firebase/messaging/sw';
if ('undefined' !== typeof importScripts) {
  importScripts(
    'https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js'
  );
  importScripts(
    'https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js'
  );

  console.log('notification-sw.js');
  console.log(self);
  // Initialize the Firebase app in the service worker by passing in
  // your app's Firebase config object.
  // https://firebase.google.com/docs/web/setup#config-object
  const firebaseConfig = {
    apiKey: 'AIzaSyBZv0-0ELiCEceLnmKTN5XoC0o7j6v_ZVY',
    authDomain: 'campus-fora-notif-service.firebaseapp.com',
    projectId: 'campus-fora-notif-service',
    storageBucket: 'campus-fora-notif-service.appspot.com',
    messagingSenderId: '183234640335',
    appId: '1:183234640335:web:535735f23f356c9ae6faba',
    measurementId: 'G-6WLC5YH1BJ'
  };

  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();

  messaging.onMessage((payload) => {
    console.log(payload);
    const notification = JSON.parse(payload.data.notification);
    // Customize notification here
    const notificationTitle = notification.title;
    const notificationOptions = {
      body: notification.body,
      icon: notification.icon
    };

    return self.registration.showNotification(
      notificationTitle,
      notificationOptions
    );
  });

  messaging.onBackgroundMessage(function (payload) {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    const notification = JSON.parse(payload.data.notification);
    // Customize notification here
    const notificationTitle = notification.title;
    const notificationOptions = {
      body: notification.body,
      icon: notification.icon
    };

    return self.registration.showNotification(
      notificationTitle,
      notificationOptions
    );
  });

  self.addEventListener('message', (event) => {
    console.log('message received');
    if (event.data && event.data.type === 'getToken') {
      messaging
        .getToken({
          vapidKey:
            'BOVbblVYLwM7XJzetjXoBPG0TghBD9LGiePj78XmMR-LRWwc0FpuqhXHDmPUItZrqbRTQTrs23nE_kojV73lHU8'
        })
        .then((currentToken) => {
          console.log('token received successfully');
          self.clients.matchAll().then((clients) => {
            if (clients && clients.length) {
              clients[0].postMessage({
                type: 'getTokenSuccess',
                token: currentToken
              });
            }
          });
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
          self.clients.matchAll().then((clients) => {
            if (clients && clients.length) {
              clients[0].postMessage({
                type: 'getTokenError',
                err: err
              });
            }
          });
        });
    }
  });
}
