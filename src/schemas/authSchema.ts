import { z } from 'zod';

// Login form validation schema
export const loginSchema = z.object({
  email: z
    .email('Please enter a valid email address')
    .nonempty('Email is required')
    .refine((val) => val.endsWith("@rebuhr.com"), {
      message: "Email must use @rebuhr.com domain",
    }),
  password: z
    .string()
    .nonempty('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;