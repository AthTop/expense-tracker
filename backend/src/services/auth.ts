import { db } from '../db/client';

const register = async (username: string, passwordHash: string) => {
  const user = await db
    .insertInto('users')
    .values({ username, password_hash: passwordHash })
    .returning(['user_id', 'username'])
    .executeTakeFirstOrThrow();
  return user;
};

export default { register };
