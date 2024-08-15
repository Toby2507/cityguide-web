'use server';

import { EntityType, IUser, IUserDetails } from '@/types';
import { fetchWithReAuth } from '@/utils';
import { cookies } from 'next/headers';
import toast from 'react-hot-toast';

export const getUser = async () => {
  const fullName = cookies().get('city-guide-username')?.value!;
  const email = cookies().get('city-guide-useremail')?.value!;
  const imgUrl = cookies().get('city-guide-userimg')?.value!;
  const id = cookies().get('city-guide-userid')?.value!;
  const type = cookies().get('city-guide-type')?.value! as EntityType;
  const favProperties = cookies().get('city-guide-userfavproperties')?.value;
  const phoneNumber = cookies().get('city-guide-userphone')?.value!;
  let favouriteProperties: string[] | undefined;
  if (favProperties) favouriteProperties = JSON.parse(favProperties) as string[];
  const partner = cookies().get('city-guide-partner')?.value;
  if (!fullName || !id || !partner) return null;
  const isPartner = partner === 'true' ? true : false;
  const user: IUserDetails = { id, fullName, email, phoneNumber, imgUrl, isPartner, type, favouriteProperties };
  return user;
};

export const getUserProfile = async () => {
  const res = await fetchWithReAuth('user/profile', { method: 'GET' });
  if (res.status === 404) {
    toast.error(res.statusText);
    return null;
  }
  const user = await res.json();
  return user.user as IUser;
};

export const setCookies = (res: any, type: EntityType) => {
  cookies().set('access-token', res.accessToken);
  cookies().set('refresh-token', res.refreshToken);
  cookies().set(
    'city-guide-username',
    type === EntityType.USER ? `${res.user.firstName} ${res.user.lastName}` : res.establishment.name
  );
  cookies().set('city-guide-useremail', type === EntityType.USER ? res.user.email : res.establishment.email);
  cookies().set(
    'city-guide-userphone',
    type === EntityType.USER ? res.user.phoneNumber : res.establishment.phoneNumber
  );
  cookies().set('city-guide-userimg', type === EntityType.USER ? res.user.imgUrl : res.establishment.imgUrl);
  cookies().set('city-guide-userid', type === EntityType.USER ? res.user._id : res.establishment._id);
  cookies().set('city-guide-partner', type === EntityType.USER ? res.user.isPartner : true);
  cookies().set('city-guide-type', type);
  type === EntityType.USER &&
    cookies().set('city-guide-userfavproperties', JSON.stringify(res.user.favouriteProperties));
};

export const upgradeToPartner = (res: any) => {
  cookies().set('access-token', res.accessToken);
  cookies().set('city-guide-partner', 'true');
};

const _logout = async () => {
  cookies().delete('city-guide-username');
  cookies().delete('city-guide-useremail');
  cookies().delete('city-guide-userimg');
  cookies().delete('city-guide-userid');
  cookies().delete('city-guide-partner');
  cookies().delete('city-guide-userphone');
  cookies().delete('city-guide-userfavproperties');
  cookies().delete('access-token');
  cookies().delete('refresh-token');
};

export const logout = async () => _logout();
