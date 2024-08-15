'use server';

import { IStay } from '@/types';
import { fetchBaseQuery } from '@/utils';
import toast from 'react-hot-toast';

export const getTrendingStays = async () => {
  const res = await fetchBaseQuery('property/stay/trending', { method: 'GET' });
  const stays = await res.json();
  return stays.properties as IStay[];
};

export const getStayById = async (id: string) => {
  const res = await fetchBaseQuery(`property/stay/${id}`, { method: 'GET' });
  if (res.status === 404) {
    toast.error(res.statusText);
    return;
  }
  const stay = await res.json();
  return stay.stay as IStay;
};
