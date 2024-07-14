'use server';

import { logout } from '@/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { paths } from '.';

const baseQuery = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetchBaseQuery = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = cookies().get('access-token')?.value;
  if (token) options.headers = { ...options.headers, Authorization: `Bearer ${token}` };
  options.headers = {
    ...options.headers,
    'Content-Type': 'application/json',
  };
  options = { ...options, credentials: options.credentials || 'include' };
  const res = await fetch(`${baseQuery}/${url}`, options);
  return res;
};

export const fetchWithReAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const res = await fetchBaseQuery(url, options);
  if (res.status === 401 || res.statusText === 'Unauthorized') {
    const refreshToken = cookies().get('refresh-token')?.value;
    const refreshRes = await fetchBaseQuery('account/refreshaccess', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
    if (refreshRes.ok) {
      const { accessToken } = await refreshRes.json();
      cookies().set('access-token', accessToken);
      return fetchBaseQuery(url, options);
    } else {
      logout();
      redirect(paths.login());
    }
  }
  return res;
};
