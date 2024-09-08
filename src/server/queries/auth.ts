'use server';

import { IUser } from '@/types';
import { fetchWithReAuth } from '@/utils';
import { _logout } from '../actions/cookie';

export const getUserProfile = async () => {
  const res = await fetchWithReAuth('user/profile', { method: 'GET' });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.user as IUser;
};

export const logout = async () => {
  await _logout();
};
