import React from 'react';
import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';

import BaseLayout from 'src/layouts/BaseLayout';
import useStore from '@/store/store';
import whoami from '@callbacks/auth/whoami';

function Index() {
  const router = useRouter();
  const { token, setToken } = useStore();

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      if (!token) {
        router.push('/login');
        return;
      }

      const res = whoami.get(token);
      if (res === null) {
        const refreshResponse = await whoami.refreshToken();
        if (refreshResponse == null) {
          router.push('/login');
          return;
        }
        setToken(refreshResponse?.access_token);
      }
      router.push('/1');
    };
    if (router.isReady) {
      checkIfLoggedIn();
    }
  }, [router, setToken, token]);
  return <div />;
}

export default Index;

Index.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
