import { ReactElement, useEffect } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';
import { useRouter } from 'next/router';

function Index() {
  const router = useRouter();
  
  useEffect(() => {
    const sendToMainPage = async () => {
      await router.push('/main');
    }
    if(router.isReady){
      sendToMainPage();
    }
  }, []);
  return (
    <div />
  );
}

export default Index;

Index.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
