import { boolean, coerce, number, object, string } from 'zod';

export const createUserSchema = object({
  firstName: string({ required_error: 'First name is required' }).min(3, 'First name requires atleast 3 characters'),
  lastName: string({ required_error: 'Last name is required' }).min(3, 'Last name requires atleast 3 characters'),
  phoneNumber: string()
    .regex(/^(?:(?:\+|0{1,2})[- )(?]*\d{0,3}[- )(?]*\d{3}[- )(?]*\d{3}[- )(?]*\d{4})$/, 'Invalid phone number')
    .optional(),
  email: string({ required_error: 'Email is required' }).email('Invalid email'),
  password: string({ required_error: 'Password is required' }).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,24}$/,
    '8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character. Allowed special characters: ! @ # $ % ^ & *'
  ),
  dateOfBirth: coerce.date({ required_error: 'Date of birth is required' }).optional(),
  isPartner: boolean({ invalid_type_error: 'isPartner should be a boolean' }).optional(),
});

export const createEstablishmentSchema = object({
  name: string({ required_error: 'Establishment Name is required' }).min(
    3,
    'Establishment name requires atleast 3 characters'
  ),
  description: string().optional(),
  address: object({
    name: string({ required_error: 'Address name is required' }),
    fullAddress: string().optional(),
    locationId: string({ required_error: 'Address location id is required' }),
    city: string().optional(),
    state: string({ required_error: 'State is required' }),
    country: string({ required_error: 'Country is required' }),
    geoLocation: object({
      lat: number({
        required_error: 'Latitude is required',
        invalid_type_error: 'Latitude has to be a number',
      }),
      lng: number({
        required_error: 'Longitude is required',
        invalid_type_error: 'Longitude has to be a number',
      }),
    }),
    extraDetails: string().optional(),
  }),
  phoneNumber: string({ required_error: 'Phone number is required' }).min(11, 'Invalid phone number'),
  email: string({ required_error: 'Email is required' }).email('Invalid email'),
  password: string({ required_error: 'Password is required' }).min(8, 'Password should be atleast 8 characters'),
});

export const loginUserSchema = object({
  email: string({ required_error: 'Email is required' }).email('Invalid email'),
  password: string({ required_error: 'Password is required' }).min(8, 'Password should be atleast 8 characters'),
});

export const upgradeUserSchema = object({
  phoneNumber: string().regex(
    /^(?:(?:\+|0{1,2})[- )(?]*\d{0,3}[- )(?]*\d{3}[- )(?]*\d{3}[- )(?]*\d{4})$/,
    'Invalid phone number'
  ),
  dateOfBirth: coerce.date({ required_error: 'Date of birth is required' }),
});

export const verifyOtpSchema = object({
  otp: string({ required_error: 'OTP is required' }).min(6, 'OTP should be 6 characters'),
});
