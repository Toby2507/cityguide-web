'use server';

import { logout } from '@/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { paths } from '.';

const baseQuery = process.env.NEXT_PUBLIC_SERVER_URL;
const apiQuery = process.env.NEXT_PUBLIC_API_URL;

export const fetchBaseQuery = async (
  url: string,
  options: RequestInit = {},
  isMultipart: boolean = false
): Promise<Response> => {
  const token = cookies().get('access-token')?.value;
  if (token) options.headers = { ...options.headers, Authorization: `Bearer ${token}` };
  options = { ...options, credentials: options.credentials || 'include' };
  if (!isMultipart) options.headers = { ...options.headers, 'Content-Type': 'application/json' };
  const res = await fetch(`${baseQuery}/${url}`, options);
  return res;
};

export const fetchApiRoute = async (url: string, options: RequestInit = {}): Promise<Response> => {
  options.credentials = 'include';
  const res = await fetch(`${apiQuery}/${url}`, options);
  return res;
};

export const fetchWithReAuth = async (
  url: string,
  options: RequestInit = {},
  isMultipart: boolean = false
): Promise<Response> => {
  let res = await fetchBaseQuery(url, options, isMultipart);
  if (res.status === 401 || res.statusText === 'Unauthorized') {
    const refreshRes = await fetchApiRoute('api/refreshtoken', { method: 'POST' });
    if (refreshRes.ok) {
      res = await fetchBaseQuery(url, options, isMultipart);
    } else {
      await logout();
      redirect(paths.login());
    }
  }
  return res;
};
