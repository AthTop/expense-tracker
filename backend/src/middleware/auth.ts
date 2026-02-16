import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utilities/utils';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader.startsWith('Bearer ')) {
    // set a proper error class later
    throw new Error('Missing token');
  }
  const token = authHeader.substring(7);

  const payload = await verifyToken(token);
  req.user = payload;
};
