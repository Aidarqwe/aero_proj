import {Router} from "express";
import authController from '../controllers/auth-controller';
import asyncHandler from "../service/asyncHandler";
import authMiddleware from "../middleware/auth-middleware";

const authRouter = Router();

authRouter.post('/signin', asyncHandler(authController.signin));
authRouter.post('/signin/new_token', asyncHandler(authController.refreshToken));
authRouter.post('/signup', asyncHandler(authController.signup));
authRouter.get('/info', authMiddleware, asyncHandler(authController.info));
authRouter.get('/logout', asyncHandler(authController.logout));

export default authRouter
