export interface LoginParams {
  user_id: string;
  password: string;
  remember_me: boolean;
}

export interface LoginResponse {
  token: string;
  role_id: number;
  user_id: string;
}

export interface SignupParams {
  user_id: string;
  email_id: string;
  password: string;
  confirm_password: string;
  bio: string;
  remember_me: boolean;
}
