import { Router } from 'express';
import { registerUser } from '../controllers/auth';
import { validateBody } from '../middleware/validator';
import { registerSchema } from '../validators/user';

export const authRouter = Router();

authRouter.post('/register', validateBody(registerSchema), registerUser);
