'use server';

import { ICreateRestaurant, ICreateStay } from '@/types';
import { fetchWithReAuth, formatRestaurantBody, formatStayBody, paths } from '@/utils';
import { revalidatePath } from 'next/cache';

export const uploadImages = async (body: FormData) => {
  const res = await fetchWithReAuth('account/upload', { method: 'POST', body }, true);
  const images = await res.json();
  return images.imgUrls;
};

export const createStay = async (body: ICreateStay) => {
  const data = formatStayBody(body);
  await fetchWithReAuth('property/stay', { method: 'POST', body: JSON.stringify(data) });
  revalidatePath(paths.stays());
};

export const createRestaurant = async (body: ICreateRestaurant) => {
  const data = formatRestaurantBody(body);
  await fetchWithReAuth('property/restaurant', { method: 'POST', body: JSON.stringify(data) });
  revalidatePath(paths.restaurants());
};
