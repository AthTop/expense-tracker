import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth';
import { validateBody } from '../middleware/validator';
import { loginSchema, registerSchema } from '../validators/user';

export const authRouter = Router();

authRouter.post('/register', validateBody(registerSchema), registerUser);
authRouter.post('/login', validateBody(loginSchema), loginUser);
