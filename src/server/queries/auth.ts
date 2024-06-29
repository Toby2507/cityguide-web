'use server';

import { IUserDetails } from '@/types';
import { cookies } from 'next/headers';

export const getUser = async () => {
  const fullName = cookies().get('city-guide-username')?.value!;
  const imgUrl = cookies().get('city-guide-userimg')?.value!;
  const id = cookies().get('city-guide-userid')?.value!;
  const type = cookies().get('city-guide-type')?.value! as 'establishment' | 'user';
  const user: IUserDetails = { id, fullName, imgUrl, type };
  return user;
};

export const setCookies = (res: any, type: 'user' | 'establishment') => {
  cookies().set('token', res.accessToken);
  cookies().set(
    'city-guide-username',
    type === 'user' ? `${res.user.firstName} ${res.user.lastName}` : res.establishment.name
  );
  cookies().set('city-guide-userimg', type === 'user' ? res.user.imgUrl : res.establishment.imgUrl);
  cookies().set('city-guide-userid', type === 'user' ? res.user._id : res.establishment._id);
  cookies().set('city-guide-type', type);
};

const _logout = async () => {
  cookies().delete('city-guide-username');
  cookies().delete('city-guide-userimg');
  cookies().delete('city-guide-userid');
  cookies().delete('token');
};

export const logout = async () => _logout();
