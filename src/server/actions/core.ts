'use server';

import { createReservationSchema } from '@/schemas';
import { ICreateReservation, IPayment, IReservation, PropertyType } from '@/types';
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

export const createReservation = async (reservation: ICreateReservation) => {
  const { specialRequest, ...body } = reservation;
  if (specialRequest) body.requests = [...(body.requests || []), specialRequest];
  const data = createReservationSchema.safeParse(body);
  if (!data.success) throw new Error(data.error.flatten().formErrors.join(', '));
  const res = await fetchWithReAuth('reservation/create', { method: 'POST', body: JSON.stringify(data.data) });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.reservation as IReservation;
};
