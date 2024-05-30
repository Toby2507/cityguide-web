import { object, string } from 'zod';

export const loginUserSchema = object({
  email: string({ required_error: 'Email is required' }).email('Invalid email'),
  password: string({ required_error: 'Password is required' }).min(8, 'Password should be atleast 8 characters'),
});
