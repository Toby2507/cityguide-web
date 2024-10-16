'use server';

import { IPayment, PropertyType } from '@/types';
import { fetchWithReAuth } from '@/utils';
import { revalidatePath } from 'next/cache';
import { addToFavourites, removeFromFavourites } from './cookie';

export const refetchPage = async (path: string) => {
  revalidatePath(path);
};

export const addFavouriteProperty = async (propertyId: string, propertyType: PropertyType) => {
  const data = { propertyId, propertyType };
  const res = await fetchWithReAuth('user/favproperty/add', { method: 'PATCH', body: JSON.stringify(data) });
  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.message);
  }
  addToFavourites(data);
};

export const removeFavouriteProperty = async (propertyId: string) => {
  const res = await fetchWithReAuth('user/favproperty/remove', {
    method: 'PATCH',
    body: JSON.stringify({ propertyId }),
  });
  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.message);
  }
  removeFromFavourites(propertyId);
};

export const readNotifications = async (notificationIds: string[]) => {
  const res = await fetchWithReAuth('notification', {
    method: 'PATCH',
    body: JSON.stringify({ notificationIds }),
  });
  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.message);
  }
};

export const initiatePayment = async (amount: number, currency: string = 'NGN') => {
  const res = await fetchWithReAuth('payment/initiate', {
    method: 'POST',
    body: JSON.stringify({ amount, currency }),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result as IPayment;
};
