import React from 'react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';

import useStore from '@/store/store';
import { SignupParams } from '@callbacks/auth/types';
import Meta from '@/components/Meta';
import loginRequest from '@callbacks/auth/login';

function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SignupParams>();

  const [loading, setLoading] = useState(false);
  const [passwordValues, setPasswordValues] = useState({
    password: '',
    showPassword: false
  });

  const [confirmPasswordValues, setConfirmPasswordValues] = useState({
    password: '',
    showPassword: false
  });

  const { setToken, setRole, setName, setUserID } = useStore();

  useEffect(() => {
    setToken('');
    setRole(0);
    setName('');
    setUserID('');
  }, [setName, setRole, setToken, setUserID]);

  const onSignup = async (data: SignupParams) => {
    setLoading(true);
    const response = await loginRequest.post(data);
    if (response.token !== '') {
      setToken(response.token);
      setRole(response.role_id);
      reset({
        user_id: '',
        password: ''
      });
      router.push('/main');
    }
    setLoading(false);
  };

  const handleClickShowPassword = () => {
    setPasswordValues({
      ...passwordValues,
      showPassword: !passwordValues.showPassword
    });
  };

  const handleClickShowConfirmPassword = () => {
    setConfirmPasswordValues({
      ...confirmPasswordValues,
      showPassword: !confirmPasswordValues.showPassword
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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
              Sign Up
            </Typography>
          }
        />
        <Divider />
        <CardContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' }
            }}
            noValidate
            autoComplete="off"
          >
            <Stack
              spacing={2}
              justifyContent="center"
              alignItems="center"
              sx={{ minHeight: '40vh' }}
            >
              <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                <InputLabel htmlFor="user_id" error={!!errors.user_id}>
                  User ID
                </InputLabel>
                <OutlinedInput
                  id="Username"
                  label="Username"
                  error={!!errors.user_id}
                  // helperText={errors.user_id ? "Incorrect Email ID" : ""}
                  {...register('user_id', { required: true })}
                  defaultValue=""
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                <InputLabel htmlFor="Email ID" error={!!errors.email_id}>
                  Email ID
                </InputLabel>
                <OutlinedInput
                  id="Email ID"
                  label="Email ID"
                  error={!!errors.email_id}
                  {...register('email_id', {
                    required: true,
                    pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                    setValueAs: (value) => value.trim()
                  })}
                  defaultValue=""
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                <InputLabel htmlFor="password" error={!!errors.password}>
                  Password
                </InputLabel>
                <OutlinedInput
                  id="password"
                  error={!!errors.password}
                  type={passwordValues.showPassword ? 'text' : 'password'}
                  {...register('password', { required: true })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {passwordValues.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                <InputLabel
                  htmlFor="password"
                  error={!!errors.confirm_password}
                >
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="password"
                  error={!!errors.confirm_password}
                  type={
                    confirmPasswordValues.showPassword ? 'text' : 'password'
                  }
                  {...register('confirm_password', { required: true })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {confirmPasswordValues.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="ConfirmPassword"
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: '37ch' }} variant="outlined">
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    <Checkbox
                      size="small"
                      {...register('remember_me')}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                    Remember Me
                  </Typography>
                </Stack>
              </FormControl>
              <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  onClick={handleSubmit(onSignup)}
                >
                  Sign Up
                </LoadingButton>
              </FormControl>
              <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                <Typography>
                  Already have an account?{' '}
                  <span>
                    <Link href="/login">Login</Link>
                  </span>
                </Typography>
              </FormControl>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default SignUp;
