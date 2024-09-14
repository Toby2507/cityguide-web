'use server';

import { IUser } from '@/types';
import { fetchBaseQuery, fetchWithReAuth, paths } from '@/utils';
import { redirect } from 'next/navigation';
import { _logout, getCookie, setCookie } from '../actions/cookie';

export const getUserProfile = async () => {
  const res = await fetchWithReAuth('user/profile', { method: 'GET' });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.user as IUser;
};

export const logout = async () => {
  await _logout();
  redirect(paths.login());
};

export const refreshAccessToken = async () => {
  const refreshToken = await getCookie('refresh-token');
  const res = await fetchBaseQuery('account/refreshaccess', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  });
  if (res.ok) {
    const { accessToken } = await res.json();
    await setCookie('access-token', accessToken);
    return true;
  }
  return false;
};
