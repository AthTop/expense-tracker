import { Request, Response } from 'express';
import { RegisterDTO } from '../validators/user';
import authService from '../services/auth';
import { hashPassword } from '../utilities/password-utils';

interface SuccessResponse {
  message: string;
  userId: string;
}

export const registerUser = async (
  req: Request<any, any, RegisterDTO>,
  res: Response<SuccessResponse>,
) => {
  const { username, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const user = await authService.register(username, hashedPassword);

  res.status(201).json({ message: 'User created', userId: user.user_id });
};
