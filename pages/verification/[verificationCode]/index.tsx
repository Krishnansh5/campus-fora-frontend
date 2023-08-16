import { CircularProgress, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import signup from '@callbacks/auth/signup';

export default function VerificationPending() {
  const router = useRouter();
  const { verificationCode } = router.query;
  const [loading, setLoading] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [message, setMessage] = React.useState('');
  useEffect(() => {
    const verify = async () => {
      const res = await signup.verify(verificationCode as string);
      if (res === null) {
        setStatus('fail');
        setMessage('Internal Server Error');
        setLoading(false);
        return;
      }
      setStatus(res.status);
      setMessage(res.message);
      setLoading(false);
    };
    verify();
  }, [verificationCode]);
  return (
    <div>
      {loading && <CircularProgress />}
      {!loading && (
        <>
          <Typography variant="h2">Verification {status}</Typography>
          <Typography variant="h4">{message}</Typography>
        </>
      )}
    </div>
  );
}
