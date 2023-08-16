import React from 'react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
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
import { LoginParams } from '@callbacks/auth/types';
import Meta from '@/components/Meta';
import loginRequest from '@callbacks/auth/login';

function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginParams>();

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  });

  const { setToken, setRole, setName, setUserID } = useStore();

  useEffect(() => {
    setToken('');
    setRole(0);
    setName('');
    setUserID(0);
  }, [setName, setRole, setToken, setUserID]);

  const onLogin = async (data: LoginParams) => {
    setLoading(true);
    const response = await loginRequest.post(data);
    if (response && response.access_token !== '') {
      setToken(response.access_token);
      setRole(response.role_id);
      reset({
        email: '',
        password: ''
      });
      router.push('topic/1');
    }
    setLoading(false);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
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
              Login
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
                <InputLabel htmlFor="Email ID" error={!!errors.email}>
                  Email ID
                </InputLabel>
                <OutlinedInput
                  id="Email ID"
                  label="Email ID"
                  error={!!errors.email}
                  // helperText={errors.user_id ? "Incorrect Email ID" : ""}
                  {...register('email', {
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
                  type={values.showPassword ? 'text' : 'password'}
                  {...register('password', { required: true })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                {errors.password && (
                  <FormHelperText error={!!errors.password}>
                    Incorrect password
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl sx={{ m: 1, width: '37ch' }} variant="outlined">
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {/* <Typography variant="subtitle2" color="text.secondary">
                    <Checkbox
                      size="small"
                      {...register('remember_me')}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                    Remember Me
                  </Typography> */}
                  <Typography variant="subtitle2" color="text.secondary">
                    <span>
                      <Link href="/reset-password">Forgot password?</Link>
                    </span>
                  </Typography>
                </Stack>
              </FormControl>
              <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  onClick={handleSubmit(onLogin)}
                >
                  Sign In
                </LoadingButton>
              </FormControl>
              <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                <Typography>
                  Don&apos;t have an account?{' '}
                  <span>
                    <Link href="/signup">Sign Up</Link>
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

export default Login;
