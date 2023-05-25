import React from 'react';
import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';

import BaseLayout from 'src/layouts/BaseLayout';

function Index() {
  const router = useRouter();

  useEffect(() => {
    const sendToMainPage = async () => {
      await router.push('/main');
    };
    if (router.isReady) {
      sendToMainPage();
    }
  }, [router]);
  return <div />;
}

export default Index;

Index.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
