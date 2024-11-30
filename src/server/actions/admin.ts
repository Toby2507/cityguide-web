'use server';

import {
  CreateNightlifeInput,
  CreateRestaurantInput,
  CreateStayInput,
  UpdateRestaurantInput,
  UpdateStayInput,
} from '@/schemas';
import { IAccommodation, IMenu, IUpdateNightlife } from '@/types';
import { fetchWithReAuth, formatNightlifeBody, formatRestaurantBody, formatStayBody, paths } from '@/utils';
import { revalidatePath } from 'next/cache';

export const uploadImages = async (body: FormData) => {
  const res = await fetchWithReAuth('account/upload', { method: 'POST', body }, true);
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.imgUrls;
};

// Stay
export const createStay = async (body: CreateStayInput) => {
  const data = formatStayBody(body);
  await fetchWithReAuth('property/stay', { method: 'POST', body: JSON.stringify(data) });
  revalidatePath(paths.adminStays());
};

export const updateStay = async (body: UpdateStayInput, stayId: string) => {
  const res = await fetchWithReAuth(`property/stay/${stayId}`, { method: 'PATCH', body: JSON.stringify(body) });
  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.message);
  }
  revalidatePath(paths.adminStay(stayId));
};

export const deleteStay = async (stayId: string) => {
  const res = await fetchWithReAuth(`property/stay/${stayId}`, { method: 'DELETE' });
  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.message);
  }
  revalidatePath(paths.adminStay(stayId));
};

export const addAccommodation = async (body: IAccommodation[], stayId: string) => {
  const res = await fetchWithReAuth(`property/stay/${stayId}/accommodation`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.message);
  }
  revalidatePath(paths.adminStay(stayId));
};

export const updateAccommodation = async (body: IAccommodation, stayId: string) => {
  const res = await fetchWithReAuth(`property/stay/${stayId}/accommodation/${body.id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.message);
  }
  revalidatePath(paths.adminStay(stayId));
};

export const removeAccommodation = async (stayId: string, accId: string) => {
  const res = await fetchWithReAuth(`property/stay/${stayId}/accommodation/${accId}`, { method: 'DELETE' });
  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.message);
  }
  revalidatePath(paths.adminStay(stayId));
};

// Restaurant
export const createRestaurant = async (body: CreateRestaurantInput) => {
  const data = formatRestaurantBody(body);
  await fetchWithReAuth('property/restaurant', { method: 'POST', body: JSON.stringify(data) });
  revalidatePath(paths.adminRestaurants());
};

export const updateRestaurant = async (body: UpdateRestaurantInput, resId: string) => {
  const res = await fetchWithReAuth(`property/restaurant/${resId}`, { method: 'PATCH', body: JSON.stringify(body) });
  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.message);
  }
  revalidatePath(paths.adminRestaurant(resId));
};

export const deleteRestaurant = async (resId: string) => {
  const res = await fetchWithReAuth(`property/restaurant/${resId}`, { method: 'DELETE' });
  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.message);
  }
  revalidatePath(paths.adminRestaurant(resId));
};

export const addMenuItem = async (body: IMenu[], resId: string) => {
  const res = await fetchWithReAuth(`property/restaurant/${resId}/menu`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.message);
  }
  revalidatePath(paths.adminRestaurant(resId));
};

export const updateMenuItem = async (body: IMenu, resId: string) => {
  const res = await fetchWithReAuth(`property/restaurant/${resId}/menu/${body.id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.message);
  }
  revalidatePath(paths.adminRestaurant(resId));
};

export const removeMenuItem = async (resId: string, menuId: string) => {
  const res = await fetchWithReAuth(`property/restaurant/${resId}/menu/${menuId}`, { method: 'DELETE' });
  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.message);
  }
  revalidatePath(paths.adminRestaurant(resId));
};

// Nightlife
export const createNightlife = async (body: CreateNightlifeInput) => {
  const data = formatNightlifeBody(body);
  await fetchWithReAuth('property/nightlife', { method: 'POST', body: JSON.stringify(data) });
  revalidatePath(paths.adminNightlifes());
};

export const updateNightlife = async (body: IUpdateNightlife, propId: string) => {
  const res = await fetchWithReAuth(`property/nightlife/${propId}`, { method: 'PATCH', body: JSON.stringify(body) });
  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.message);
  }
  revalidatePath(paths.adminNightlife(propId));
};

export const deleteNightlife = async (propId: string) => {
  const res = await fetchWithReAuth(`property/nightlife/${propId}`, { method: 'DELETE' });
  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.message);
  }
  revalidatePath(paths.adminNightlife(propId));
};
