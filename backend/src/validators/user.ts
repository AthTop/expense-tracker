import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 chars')
      .max(20, 'Username cannot be longer than 20 chars'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 chars')
      .max(20, 'Password cannot be longer than 20 chars')
      .regex(
        /^(?=.*[A-Z]).{6,20}$/,
        'Password must contain at least one uppercase letter',
      ),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    error: "Passwords don't match",
    path: ['passwordConfirm'],
  });

export const loginSchema = z.object({
  username: z.string().max(20),
  password: z.string().max(20),
});

export type RegisterDTO = z.infer<typeof registerSchema>;
export type LoginDTO = z.infer<typeof loginSchema>;
