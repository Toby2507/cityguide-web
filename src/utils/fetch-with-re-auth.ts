'use server';

import { getCookie, logout, refreshAccessToken } from '@/server';

const baseQuery = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetchBaseQuery = async (
  url: string,
  options: RequestInit = {},
  isMultipart: boolean = false
): Promise<Response> => {
  const token = await getCookie('access-token');
  if (token) options.headers = { ...options.headers, Authorization: `Bearer ${token}` };
  options = { ...options, credentials: options.credentials || 'include' };
  if (!isMultipart) options.headers = { ...options.headers, 'Content-Type': 'application/json' };
  const res = await fetch(`${baseQuery}/api/v1/${url}`, options);
  return res;
};

export const fetchWithReAuth = async (
  url: string,
  options: RequestInit = {},
  isMultipart: boolean = false
): Promise<Response> => {
  let res = await fetchBaseQuery(url, options, isMultipart);
  if (res.status === 401 || res.statusText === 'Unauthorized') {
    const refreshRes = await refreshAccessToken();
    if (!refreshRes) {
      await logout();
      return new Response(null, { status: 401 });
    }
    res = await fetchBaseQuery(url, options, isMultipart);
  }
  return res;
};
