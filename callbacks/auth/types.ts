export interface LoginParams {
  email: string;
  password: string;
  // remember_me: boolean;
}

export interface LoginResponse {
  status: string;
  access_token: string;
  role_id: number;
}

export interface SignupParams {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  bio: string;
  remember_me: boolean;
}

export interface SignupResponse {
  status: string;
  message: string;
}

export interface VerifyEmailResponse {
  status: string;
  message: string;
}
export interface WhoamiResponse {
  id: number;
  role: number;
  email: string;
  name: string;
}

export interface RefreshResponse {
  access_token: string;
  status: string;
}
