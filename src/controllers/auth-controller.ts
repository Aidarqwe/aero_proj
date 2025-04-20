import {Request, Response, NextFunction} from "express";
import * as bcrypt from "bcrypt";
import ApiError from "../exceptions/api-error";
import {IAuthRequest, LoginRequest} from "../types/auth/auth";
import {User} from "../models";
import tokenService from "../service/token-service";

class AuthController {

    async signup(req: Request, res: Response, next: NextFunction) {
        try {

            const { id, password }: LoginRequest = req.body;

            const existingUser = await User.findOne({ where: { id } });
            if (existingUser) {
                return next(ApiError.BadRequest("Пользователь уже зарегистрирован", []));
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({ id, password: hashedPassword });

            const tokens = tokenService.generateTokens({ id: newUser.id });
            await tokenService.saveToken(newUser.id, tokens.refreshToken);

            return res.json({
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            });
        } catch (error) {
            next(error);
        }
    }

    async signin(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, password }: LoginRequest = req.body;

            const user = await User.findOne({ where: { id } });
            if (!user) {
                throw ApiError.BadRequest('Пользователь с таким id не найден');
            }

            const isPassEquals = await bcrypt.compare(password, user.password);
            if (!isPassEquals) {
                throw ApiError.BadRequest('Неверный пароль');
            }


            const tokens = tokenService.generateTokens({
                id: user.id,
            });

            await tokenService.saveToken(user.id, tokens.refreshToken);

            res.cookie('refreshToken', tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.json({
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            });
        } catch (error) {
            next(error);
        }
    }

    async refreshToken(req: Request, res: Response, next: NextFunction){
        try {
            const { refreshToken } = req.cookies;

            if (!refreshToken) {
                throw ApiError.UnauthorizedError();
            }

            const userData = tokenService.validateRefreshToken(refreshToken);
            const tokenFromDb = await tokenService.findToken(refreshToken);
            if (!userData || !tokenFromDb) {
                throw ApiError.UnauthorizedError();
            }

            const user = await User.findByPk(userData.id);
            if (!user) {
                throw ApiError.BadRequest('Пользователь не найден');
            }

            const tokens = tokenService.generateTokens({
                id: user.id,
            });

            await tokenService.saveToken(user.id, tokens.refreshToken);

            res.cookie('refreshToken', tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });

            return res.json({
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            });
        } catch (error) {
            next(error);
        }
    }

    async info(req: Request, res: Response, next: NextFunction) {
        try {
            const user = (req as unknown as IAuthRequest).user;
            res.json({ id: user?.id });
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction){
        try {
            const { refreshToken } = req.cookies;

            await tokenService.removeToken(refreshToken);
            res.clearCookie('refreshToken');

            return res.json({ message: 'Вы успешно вышли из системы' });
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();