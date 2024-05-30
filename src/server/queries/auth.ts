'use server';

import { cookies } from 'next/headers';

export const getUser = async () => {
  const user = cookies().get('city-guide-user');
  return user;
};

const _logout = async () => {
  cookies().delete('city-guide-user');
  cookies().delete('token');
};

export const logout = async () => _logout();
