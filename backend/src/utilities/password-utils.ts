import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';

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
