import bcrypt from 'bcrypt';
import { jwtVerify, SignJWT } from 'jose';
import { jwtPayloadSchema } from '../validators/jwt';

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const validatePassword = async (
  password: string,
  passwordHash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, passwordHash);
};

export const generateJWT = async (payload: {
  userId: string;
  username: string;
}): Promise<string> => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('12h')
    .sign(secret);

  return token;
};

export const verifyToken = async (token: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  try {
    const { payload } = await jwtVerify(token, secret);
    const validatedPayload = jwtPayloadSchema.parse(payload);
    return validatedPayload;
  } catch (err) {
    throw new Error('Invalid or missing token');
  }
};
