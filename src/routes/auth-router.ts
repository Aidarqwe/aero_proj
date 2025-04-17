import {Router} from "express";
import authController from '../controllers/auth-controller';

const authRouter = Router();

// authRouter.post('/signin', authController.signin);
// authRouter.post('/signin/new_token', authController.refreshToken);
// authRouter.post('/signup', authController.signup);
// authRouter.get('/info', authController.info);
// authRouter.get('/logout', authController.logout);

export default authRouter
