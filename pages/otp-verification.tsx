import React from 'react';
import {
  Card,
  CardHeader,
  FormControl,
  Stack,
  Typography
} from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { LoadingButton } from '@mui/lab';

import Meta from '@/components/Meta';

function VerifyOTP() {
  const [otp, setOtp] = React.useState('');

  const handleChange = (newValue) => {
    setOtp(newValue);
  };
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <Meta />
      <Card
        elevation={2}
        sx={{
          padding: 3,
          borderRadius: '10px',
          maxHeight: '80vh',
          width: { xs: '330px', sm: '600px', margin: '10px auto' }
        }}
      >
        <CardHeader
          title={
            <Typography variant="h2" component="div" align="center">
              OTP verification
            </Typography>
          }
        />
        <br />
        <br />
        <MuiOtpInput value={otp} onChange={handleChange} />
        <br />
        <br />
        <Typography align="center">
          <FormControl
            sx={{ m: 1, width: '15ch', position: 'centre' }}
            variant="outlined"
          >
            <LoadingButton
              //   loading={loading}
              variant="contained"
              //   onClick={handleSubmit(onSignup)}
            >
              Verify
            </LoadingButton>
          </FormControl>
        </Typography>
      </Card>
    </Stack>
  );
}

export default VerifyOTP;
