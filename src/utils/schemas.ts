import { object, string } from 'zod';

export const createUserSchema = object({
  firstName: string({ required_error: 'First name is required' }).min(3, 'First name requires atleast 3 characters'),
  lastName: string({ required_error: 'Last name is required' }).min(3, 'Last name requires atleast 3 characters'),
  phoneNumber: string()
    .regex(/^(?:(?:\+|0{1,2})[- )(?]*\d{1,3}[- )(?]*\d{3}[- )(?]*\d{3}[- )(?]*\d{4})$/, 'Invalid phone number')
    .optional(),
  email: string({ required_error: 'Email is required' }).email('Invalid email'),
  password: string({ required_error: 'Password is required' }).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,24}$/,
    '8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character. Allowed special characters: ! @ # $ % ^ & *'
  ),
});

export const loginUserSchema = object({
  email: string({ required_error: 'Email is required' }).email('Invalid email'),
  password: string({ required_error: 'Password is required' }).min(8, 'Password should be atleast 8 characters'),
});
