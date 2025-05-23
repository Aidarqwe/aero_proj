import { Request, Response, NextFunction } from "express";
import ApiError from "../exceptions/api-error";
import tokenService from "../service/token-service";
import {TokenPayload} from "../types/auth/token";

export interface IAuthRequest extends Request {
	user?: TokenPayload;
}

export default function authMiddleware(req: IAuthRequest, res: Response, next: NextFunction) {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			return next(ApiError.UnauthorizedError());
		}

		const accessToken = authHeader.split(" ")[1];
		if (!accessToken) {
			return next(ApiError.UnauthorizedError());
		}

		const userData = tokenService.validateAccessToken(accessToken);
		if (!userData) {
			return next(ApiError.UnauthorizedError());
		}

		req.user = userData;
		next();
	} catch (e) {
		return next(ApiError.UnauthorizedError());
	}
}
