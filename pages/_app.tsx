import React, { useEffect } from 'react';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
// eslint-disable-next-line import/order
import nProgress from 'nprogress';
import './components/profilepage/Details.css';
import './components/profilepage/Pfp.css';
import './components/profilepage/Bio.css';
import './components/profilepage/DetailsField.css';

import 'nprogress/nprogress.css';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import FingerprintJS, { Agent } from '@fingerprintjs/fingerprintjs';
import { ToastContainer } from 'react-toastify';

import createEmotionCache from 'src/createEmotionCache';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import ThemeProvider from 'src/theme/ThemeProvider';
import useStore from '@/store/store';
import { FirebaseCloudMessaging } from 'notifications/firebase';
import 'react-toastify/dist/ReactToastify.css';

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface TokyoAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export const FCM = new FirebaseCloudMessaging();

function App(props: TokyoAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  const {
    notificationToken,
    token,
    userID,
    setNotificationToken,
    receiveNotification
  } = useStore();
  let fpPromise: Promise<Agent>;
  if (typeof window !== 'undefined') {
    fpPromise = FingerprintJS.load();
  }
  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  async function getNotifToken() {
    const deviceID = localStorage.getItem('deviceId');
    // const notifToken = await saveNotifToken(token, parseInt(userID), messaging);
    setNotificationToken(await FCM.saveNotifToken(token, userID, deviceID));
  }

  useEffect(() => {
    if (
      localStorage.getItem('deviceId') === null ||
      localStorage.getItem('deviceId') === ''
    ) {
      (async () => {
        const fp = await fpPromise;
        const result = await fp.get();
        localStorage.setItem('deviceId', result.visitorId);
        console.log(result.visitorId);
      })();
    }

    if ('serviceWorker' in navigator) {
      console.log('registering service worker');
      navigator.serviceWorker
        .register('./firebase-messaging-sw.js', {
          scope: '/'
        })
        .then(
          function (registration) {
            console.log(
              'Service Worker registration successful with scope: ',
              registration.scope
            );
          },
          function (err) {
            console.log('Service Worker registration failed: ', err);
          }
        );
    }

    FCM.init();
    if (
      Notification.permission === 'granted' &&
      receiveNotification &&
      (notificationToken === undefined || notificationToken === '') &&
      token !== undefined &&
      token !== '' &&
      userID !== undefined &&
      userID !== 0 &&
      localStorage.getItem('deviceId') !== null &&
      localStorage.getItem('deviceId') !== ''
    ) {
      console.log('saving new notification token');
      getNotifToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Campus Fora</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <SidebarProvider>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            <ToastContainer />
            {getLayout(<Component {...pageProps} />)}
          </LocalizationProvider>
        </ThemeProvider>
      </SidebarProvider>
    </CacheProvider>
  );
}

export default App;
