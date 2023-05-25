import { AUTH_URL, ErrorType, SERVER_ERROR, responseBody } from "@callbacks/constants";
import axios, { AxiosResponse } from "axios";
import { LoginParams, LoginResponse } from "./types";

const authInstance = axios.create({
    baseURL: AUTH_URL,
    timeout: 15000,
    timeoutErrorMessage: SERVER_ERROR,
});

const loginRequest = {
    post: (body: LoginParams) =>
        authInstance.post<
            LoginResponse,
            AxiosResponse<LoginResponse, LoginParams>,
            LoginParams
        >("/login", body)
            .then(responseBody)
            .catch((err: ErrorType) => {
                console.log("Error in logging in", err);
                return { user_id: "", token: "", role_id: 0 } as LoginResponse;
            }),
}

export default loginRequest