import { z } from 'zod';

export const jwtPayloadSchema = z.object({
  userId: z.string(),
  username: z.string(),
});
