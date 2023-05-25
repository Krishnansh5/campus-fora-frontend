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