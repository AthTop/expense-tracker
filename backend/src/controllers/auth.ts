import { Request, Response } from 'express';
import { LoginDTO, RegisterDTO } from '../validators/user';
import authService from '../services/auth';
import { hashPassword } from '../utilities/utils';

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

export const loginUser = async (
  req: Request<any, any, LoginDTO>,
  res: Response,
) => {
  const { username, password } = req.body;
  const token = await authService.login(username, password);
  res.status(200).json({ token });
};
