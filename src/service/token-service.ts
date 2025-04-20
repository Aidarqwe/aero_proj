import * as jwt from "jsonwebtoken";
import Token from "../models/Token";
import ApiError from "../exceptions/api-error";
import {TokenPayload} from "../types/auth/token";


class TokenService {
	generateTokens(payload: TokenPayload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, { expiresIn: "10m" });
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: "30d" });
		return {
			accessToken,
			refreshToken
		};
	}

	validateAccessToken(token: string): TokenPayload | null {
		try {
			const secret = process.env.JWT_ACCESS_SECRET as string;
			return jwt.verify(token, secret) as TokenPayload;
		} catch (e) {
			return null;
		}
	}

	validateRefreshToken(token: string): TokenPayload | null {
		try {
			return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as TokenPayload;
		} catch (e) {
			return null;
		}
	}

	async saveToken(userId: string, refreshToken: string): Promise<void> {
		try {
			await Token.create({ userId, refreshToken });
			console.log("New token saved successfully");
		} catch (error: unknown) {
			console.error("Ошибка при сохранении токена", error);
			throw new ApiError(500, "Неизвестная ошибка при сохранении токена", []);
		}
	}
	async removeToken(refreshToken: string): Promise<void> {
		try {
			const result = await Token.destroy({ where: { refreshToken } });

			if (result) {
				console.log('Token removed successfully');
			} else {
				console.log('Token not found');
			}
		} catch (error: unknown) {
			console.error('Ошибка при удалении токена');
			throw new ApiError(500, 'Ошибка при удалении токена', []);
		}
	}

	async findToken(refreshToken: string): Promise<Token | null> {
		try {
			const token = await Token.findOne({ where: { refreshToken } });

			if (!token) {
				return null;
			}

			return token;
		} catch (error: unknown) {
			console.error('Неизвестная ошибка при поиске токена');
			throw new ApiError(500, 'Неизвестная ошибка при поиске токена', []);
		}
	}

}

export default new TokenService();
