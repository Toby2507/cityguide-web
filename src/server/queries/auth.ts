'use server';

import { EntityType, IUser, IUserDetails } from '@/types';
import { fetchWithReAuth } from '@/utils';
import { cookies } from 'next/headers';
import toast from 'react-hot-toast';

const BASEURL = process.env.NEXT_PUBLIC_API_URL;

export const getUser = async () => {
  const fullName = cookies().get('username')?.value;
  const email = cookies().get('useremail')?.value!;
  const imgUrl = cookies().get('userimg')?.value!;
  const id = cookies().get('userid')?.value;
  const type = cookies().get('type')?.value as EntityType;
  const favProperties = cookies().get('userfavproperties')?.value;
  const phoneNumber = cookies().get('userphone')?.value!;
  let favouriteProperties: string[] = [];
  if (favProperties) favouriteProperties = JSON.parse(favProperties) as string[];
  const partner = cookies().get('partner')?.value;
  if (!fullName || !id || !partner) return null;
  const isPartner = partner === 'true' ? true : false;
  const user: IUserDetails = { id, fullName, email, phoneNumber, imgUrl, isPartner, type, favouriteProperties };
  return user;
};

export const getUserProfile = async () => {
  const res = await fetchWithReAuth('user/profile', { method: 'GET' });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.user as IUser;
};

export const setCookies = async (res: any, type: EntityType) => {
  cookies().set('access-token', res.accessToken);
  cookies().set('refresh-token', res.refreshToken);
  cookies().set(
    'username',
    type === EntityType.USER ? `${res.user.firstName} ${res.user.lastName}` : res.establishment.name
  );
  cookies().set('useremail', type === EntityType.USER ? res.user.email : res.establishment.email);
  cookies().set('userphone', type === EntityType.USER ? res.user.phoneNumber : res.establishment.phoneNumber);
  cookies().set('userimg', type === EntityType.USER ? res.user.imgUrl : res.establishment.imgUrl);
  cookies().set('userid', type === EntityType.USER ? res.user._id : res.establishment._id);
  cookies().set('partner', type === EntityType.USER ? res.user.isPartner : true);
  cookies().set('type', type);
  type === EntityType.USER && cookies().set('userfavproperties', JSON.stringify(res.user.favouriteProperties));
};

export const upgradeToPartner = (res: any) => {
  cookies().set('access-token', res.accessToken);
  cookies().set('partner', 'true');
};

const _logout = async () => {
  cookies().delete('username');
  cookies().delete('useremail');
  cookies().delete('userphone');
  cookies().delete('userimg');
  cookies().delete('userid');
  cookies().delete('partner');
  cookies().delete('userfavproperties');
  cookies().delete('type');
  cookies().delete('access-token');
  cookies().delete('refresh-token');
};

export const logout = async () => {
  await _logout();
};
