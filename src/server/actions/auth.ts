'use server';

import { signIn } from '@/auth';
import { IAddress, IFormCreateEstablishment, IFormCreateUser, IFormLoginUser, IFormVerifyOtp } from '@/types';
import {
  createEstablishmentSchema,
  createUserSchema,
  fetchBaseQuery,
  fetchWithReAuth,
  loginUserSchema,
  paths,
  verifyOtpSchema,
} from '@/utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const signInWithGoogle = async () => signIn('google');
export const signInWithFacebook = async () => signIn('facebook');

export const createUser = async (_: IFormCreateUser, formData: FormData): Promise<IFormCreateUser> => {
  const data = createUserSchema.safeParse({
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    phoneNumber: formData.get('phoneNumber') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });
  if (!data.success) return { errors: data.error.flatten().fieldErrors };
  try {
    const res = await fetchBaseQuery('user/signup', {
      method: 'POST',
      body: JSON.stringify(data.data),
    });
    if (res.status === 409) return { errors: { _form: ['Email already exists'] } };
    const response = await res.json();
    console.log(response);
    const user = JSON.stringify({
      fullName: `${response.user.firstName} ${response.user.lastName}`,
      imgUrl: response.user.imgUrl,
      id: response.user._id,
      type: 'user',
    });
    cookies().set('token', response.accessToken);
    cookies().set('city-guide-user', JSON.stringify(user));
  } catch (err: unknown) {
    if (err instanceof Error) return { errors: { _form: [err.message] } };
    else return { errors: { _form: ['Something went wrong...'] } };
  }
  redirect(paths.otp(data.data.email));
};

export const createEstablishment = async (
  address: IAddress,
  _: IFormCreateEstablishment,
  formData: FormData
): Promise<IFormCreateEstablishment> => {
  const data = createEstablishmentSchema.safeParse({
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    address,
    phoneNumber: formData.get('phoneNumber') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });
  if (!data.success) return { errors: data.error.flatten().fieldErrors };
  try {
    const res = await fetchBaseQuery('establishment/signup', {
      method: 'POST',
      body: JSON.stringify(data.data),
    });
    if (res.status === 409) return { errors: { _form: ['Email already exists'] } };
    const response = await res.json();
    const establishment = JSON.stringify({
      fullName: response.establishment.name,
      imgUrl: response.establishment.imgUrl,
      id: response.establishment._id,
      type: 'establishment',
    });
    cookies().set('token', response.accessToken);
    cookies().set('city-guide-user', JSON.stringify(establishment));
  } catch (err: unknown) {
    if (err instanceof Error) return { errors: { _form: [err.message] } };
    else return { errors: { _form: ['Something went wrong...'] } };
  }
  redirect(paths.otp(data.data.email));
};

export const loginUser = async (_: IFormLoginUser, formData: FormData): Promise<IFormLoginUser> => {
  const data = loginUserSchema.safeParse({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });
  if (!data.success) return { errors: data.error.flatten().fieldErrors };
  try {
    const res = await fetchBaseQuery('user/login', {
      method: 'POST',
      body: JSON.stringify(data.data),
    });
    if (res.status === 401) return { errors: { _form: ['Invalid email or password'] } };
    const response = await res.json();
    const user = JSON.stringify({
      fullName: `${response.user.firstName} ${response.user.lastName}`,
      imgUrl: response.user.imgUrl,
      id: response.user._id,
    });
    cookies().set('token', response.accessToken);
    cookies().set('city-guide-user', JSON.stringify(user));
  } catch (err: unknown) {
    if (err instanceof Error) return { errors: { _form: [err.message] } };
    else return { errors: { _form: ['Something went wrong...'] } };
  }
  redirect(paths.home());
};

export const verifyOtp = async (otp: string, _: IFormVerifyOtp, formData: FormData): Promise<IFormVerifyOtp> => {
  const data = verifyOtpSchema.safeParse({ otp });
  if (!data.success) return { errors: data.error.flatten().fieldErrors };
  const res = await fetchWithReAuth(`account/verifyemail/${otp}`);
  if (res.status === 400) return { errors: { _form: ['Invalid OTP'] } };
  if (res.status === 404) return { errors: { _form: ['Account not found'] } };
  if (res.status === 500) return { errors: { _form: ['Something went wrong...Try again later'] } };
  redirect(paths.home());
};
