'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { paths } from '.';

const baseQuery = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetchBaseQuery = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = cookies().get('token');
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
  // Make the request
  const res = await fetchBaseQuery(url, options);
  // If the error is 401, try to re-authenticate
  if (res.status === 401 || res.statusText === 'Unauthorized') {
    const refreshRes = await fetchBaseQuery('account/refreshaccess');
    if (refreshRes.ok) {
      const { accessToken } = await refreshRes.json();
      cookies().set('token', accessToken);
      return fetchBaseQuery(url, options);
    } else {
      cookies().delete('token');
      redirect(paths.login());
    }
  }
  return res;
};
