'use server';

import { IAccommodation, ICreateRestaurant, ICreateStay, IMenu, IUpdateRestaurant, IUpdateStay } from '@/types';
import { fetchWithReAuth, formatRestaurantBody, formatStayBody, paths } from '@/utils';
import { revalidatePath } from 'next/cache';
import toast from 'react-hot-toast';

export const uploadImages = async (body: FormData) => {
  const res = await fetchWithReAuth('account/upload', { method: 'POST', body }, true);
  const images = await res.json();
  return images.imgUrls;
};

// Stay
export const createStay = async (body: ICreateStay) => {
  const data = formatStayBody(body);
  await fetchWithReAuth('property/stay', { method: 'POST', body: JSON.stringify(data) });
  revalidatePath(paths.stays());
};

export const updateStay = async (body: IUpdateStay, stayId: string) => {
  const res = await fetchWithReAuth(`property/stay/${stayId}`, { method: 'PATCH', body: JSON.stringify(body) });
  if (res.status !== 204) return toast.error(res.statusText);
  revalidatePath(paths.adminStay(stayId));
};

export const addAccommodation = async (body: IAccommodation[], stayId: string) => {
  const res = await fetchWithReAuth(`property/stay/${stayId}/accommodation`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (res.status !== 204) return toast.error(res.statusText);
  revalidatePath(paths.adminStay(stayId));
};

export const updateAccommodation = async (body: IAccommodation, stayId: string) => {
  const res = await fetchWithReAuth(`property/stay/${stayId}/accommodation/${body.id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
  if (res.status !== 204) return toast.error(res.statusText);
  revalidatePath(paths.adminStay(stayId));
};

export const removeAccommodation = async (stayId: string, accId: string) => {
  const res = await fetchWithReAuth(`property/stay/${stayId}/accommodation/${accId}`, { method: 'DELETE' });
  if (res.status !== 204) return toast.error(res.statusText);
  revalidatePath(paths.adminStay(stayId));
};

// Restaurant
export const createRestaurant = async (body: ICreateRestaurant) => {
  const data = formatRestaurantBody(body);
  await fetchWithReAuth('property/restaurant', { method: 'POST', body: JSON.stringify(data) });
  revalidatePath(paths.restaurants());
};

export const updateRestaurant = async (body: IUpdateRestaurant, resId: string) => {
  const res = await fetchWithReAuth(`property/restaurant/${resId}`, { method: 'PATCH', body: JSON.stringify(body) });
  if (res.status !== 204) return toast.error(res.statusText);
  revalidatePath(paths.adminRestaurant(resId));
};

export const addMenuItem = async (body: IMenu[], resId: string) => {
  const res = await fetchWithReAuth(`property/restaurant/${resId}/menu`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (res.status !== 204) return toast.error(res.statusText);
  revalidatePath(paths.adminRestaurant(resId));
};

export const removeMenuItem = async (resId: string, menuId: string) => {
  const res = await fetchWithReAuth(`property/restaurant/${resId}/menu/${menuId}`, { method: 'DELETE' });
  if (res.status !== 204) return toast.error(res.statusText);
  revalidatePath(paths.adminRestaurant(resId));
};
