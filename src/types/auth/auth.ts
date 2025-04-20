import {TokenPayload} from "./token";

export interface LoginRequest {
    id: string;
    password: string;
}

export interface IAuthRequest extends Request {
    user?: TokenPayload;
}