'use server';

import { signIn } from '@/auth';
import { fetchBaseQuery, loginUserSchema, paths } from '@/utils';
import { IFormLoginUser } from '@/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const signInWithGoogle = async () => signIn('google');
export const signInWithFacebook = async () => signIn('facebook');

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
      imgUrl: `${response.user.imgUrl}`,
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

export const getUser = async () => {
  const user = cookies().get('city-guide-user');
  return user;
};
