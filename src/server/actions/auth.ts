'use server';

import { signIn } from '@/auth';
import {
  createEstablishmentSchema,
  createUserSchema,
  loginUserSchema,
  upgradeUserSchema,
  verifyOtpSchema,
} from '@/schemas';
import {
  EntityType,
  IAddress,
  IFormCreateEstablishment,
  IFormCreateUser,
  IFormLoginUser,
  IFormUpgradeUser,
  IFormVerifyOtp,
} from '@/types';
import { fetchBaseQuery, fetchWithReAuth, paths } from '@/utils';
import { redirect, RedirectType } from 'next/navigation';
import { setCookies, upgradeToPartner } from '../queries/auth';

export const signInWithGoogle = async () => signIn('google');
export const signInWithFacebook = async () => signIn('facebook');

export const createUser = async (
  isPartnering: boolean,
  _: IFormCreateUser,
  formData: FormData
): Promise<IFormCreateUser> => {
  const data = createUserSchema.safeParse({
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    phoneNumber: formData.get('phoneNumber') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    dateOfBirth: formData.get('dob'),
    isPartner: isPartnering,
  });
  if (!data.success) return { errors: data.error.flatten().fieldErrors };
  try {
    const res = await fetchBaseQuery('user/signup', {
      method: 'POST',
      body: JSON.stringify(data.data),
    });
    if (res.status === 409) return { errors: { _form: ['Email already exists'] } };
    const response = await res.json();
    setCookies(response, EntityType.USER);
  } catch (err: unknown) {
    if (err instanceof Error) return { errors: { _form: [err.message] } };
    else return { errors: { _form: ['Something went wrong...'] } };
  }
  const redirectUrl = formData.get('redirectUrl') as string;
  redirect(paths.otp(data.data.email, redirectUrl));
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
    setCookies(response, EntityType.ESTABLISHMENT);
  } catch (err: unknown) {
    if (err instanceof Error) return { errors: { _form: [err.message] } };
    else return { errors: { _form: ['Something went wrong...'] } };
  }
  const redirectUrl = formData.get('redirectUrl') as string;
  redirect(paths.otp(data.data.email, redirectUrl));
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
    setCookies(response, EntityType.USER);
  } catch (err: unknown) {
    if (err instanceof Error) return { errors: { _form: [err.message] } };
    else return { errors: { _form: ['Something went wrong...'] } };
  }
  const redirectUrl = (formData.get('redirectUrl') as string) || paths.home();
  redirect(redirectUrl, RedirectType.replace);
};

export const upgradeUser = async (_: IFormUpgradeUser, formData: FormData): Promise<IFormUpgradeUser> => {
  const data = upgradeUserSchema.safeParse({
    phoneNumber: formData.get('phoneNumber') as string,
    dateOfBirth: formData.get('dob')?.toString(),
  });
  if (!data.success) return { errors: data.error.flatten().fieldErrors };
  try {
    const res = await fetchWithReAuth('user/upgrade-to-partner', {
      method: 'PATCH',
      body: JSON.stringify(data.data),
    });
    if (!res.ok) return { errors: { _form: [res.statusText] } };
    const response = await res.json();
    upgradeToPartner(response);
  } catch (err: unknown) {
    if (err instanceof Error) return { errors: { _form: [err.message] } };
    else return { errors: { _form: ['Something went wrong...'] } };
  }
  redirect(paths.admin());
};

export const verifyOtp = async (otp: string, _: IFormVerifyOtp, formData: FormData): Promise<IFormVerifyOtp> => {
  const data = verifyOtpSchema.safeParse({ otp });
  if (!data.success) return { errors: data.error.flatten().fieldErrors };
  const res = await fetchWithReAuth(`account/verifyemail/${otp}`);
  if (res.status === 400) return { errors: { _form: ['Invalid OTP'] } };
  if (res.status === 404) return { errors: { _form: ['Account not found'] } };
  if (res.status === 500) return { errors: { _form: ['Something went wrong...Try again later'] } };
  const redirectUrl = (formData.get('redirectUrl') as string) || paths.home();
  redirect(redirectUrl, RedirectType.replace);
};
