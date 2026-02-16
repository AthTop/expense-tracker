import { db } from '../db/client';
import { validatePassword, generateJWT } from '../utilities/password-utils';

const register = async (username: string, passwordHash: string) => {
  const user = await db
    .insertInto('users')
    .values({ username, password_hash: passwordHash })
    .returning(['user_id', 'username'])
    .executeTakeFirstOrThrow();
  return user;
};

const login = async (username: string, password: string): Promise<string> => {
  const user = await db
    .selectFrom('users')
    .where('username', '=', username)
    .selectAll()
    .executeTakeFirst();

  if (!user) {
    // add a proper auth error class later
    throw new Error('Invalid credentials');
  }

  const isPassValid = await validatePassword(password, user.password_hash);
  if (!isPassValid) {
    // see above
    throw new Error('Invalid credentials');
  }

  const token = await generateJWT({
    userId: user.user_id,
    username: user.username,
  });
  return token;
};

export default { register, login };
