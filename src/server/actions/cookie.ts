'use server';

import { EntityType, IFavProperties, IUserDetails } from '@/types';
import { cookies } from 'next/headers';

export const getUser = async () => {
  const fullName = cookies().get('username')?.value;
  const email = cookies().get('useremail')?.value!;
  const imgUrl = cookies().get('userimg')?.value!;
  const id = cookies().get('userid')?.value;
  const type = cookies().get('type')?.value as EntityType;
  const favProperties = cookies().get('userfavproperties')?.value;
  const phoneNumber = cookies().get('userphone')?.value!;
  let favouriteProperties: IFavProperties[] = [];
  if (favProperties) favouriteProperties = JSON.parse(favProperties) as IFavProperties[];
  const partner = cookies().get('partner')?.value;
  if (!fullName || !id || !partner) return null;
  const isPartner = partner === 'true' ? true : false;
  const user: IUserDetails = { id, fullName, email, phoneNumber, imgUrl, isPartner, type, favouriteProperties };
  return user;
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

export const addToFavourites = async (data: IFavProperties) => {
  const favProperties = cookies().get('userfavproperties')?.value;
  let favouriteProperties: IFavProperties[] = [];
  if (favProperties) favouriteProperties = JSON.parse(favProperties) as IFavProperties[];
  favouriteProperties.push(data);
  cookies().set('userfavproperties', JSON.stringify(favouriteProperties));
};

export const removeFromFavourites = async (id: string) => {
  const favProperties = cookies().get('userfavproperties')?.value;
  let favouriteProperties: IFavProperties[] = [];
  if (favProperties) favouriteProperties = JSON.parse(favProperties) as IFavProperties[];
  favouriteProperties = favouriteProperties.filter((prop) => prop.propertyId !== id);
  cookies().set('userfavproperties', JSON.stringify(favouriteProperties));
};

export const upgradeToPartner = (res: any) => {
  cookies().set('access-token', res.accessToken);
  cookies().set('partner', 'true');
};

export const _logout = async () => {
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
