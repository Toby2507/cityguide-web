'use server';

import { createReservationSchema, VtuPurchaseType } from '@/schemas';
import { ICreateReservation, IPayment, IReservation, ISavedReceiverForm, IVtuTransaction, PropertyType } from '@/types';
import { fetchWithReAuth } from '@/utils';
import { revalidatePath } from 'next/cache';
import { addToFavourites, removeFromFavourites } from './cookie';

export const refetchPage = async (path: string) => {
  revalidatePath(path);
};

// Favourites
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

// Notification
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

// Reservation
export const createReservation = async (reservation: Partial<ICreateReservation>) => {
  const { specialRequest, ...body } = reservation;
  if (specialRequest) body.requests = [...(body.requests || []), specialRequest];
  const data = createReservationSchema.safeParse(body);
  if (!data.success)
    throw new Error(
      data.error.flatten().formErrors.join(', ') || Object.values(data.error.flatten().fieldErrors ?? {}).join(', ')
    );
  const res = await fetchWithReAuth('reservation', { method: 'POST', body: JSON.stringify(data.data) });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.reservation as IReservation;
};

// Payment
export const initiatePayment = async (amount?: number, currency?: string, useSavedCard?: boolean) => {
  const res = await fetchWithReAuth('payment/initiate', {
    method: 'POST',
    body: JSON.stringify({ amount, currency, useSavedCard }),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result as IPayment;
};

export const completePayment = async (data: Record<string, any>) => {
  const res = await fetchWithReAuth('payment/complete', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result as IPayment;
};

// VTU
export const saveVTUReceiver = async (receiver: ISavedReceiverForm, activeId?: string) => {
  const res = await fetchWithReAuth(`vtu/receivers${activeId ? `/${activeId}` : ''}`, {
    method: activeId ? 'PUT' : 'POST',
    body: JSON.stringify(receiver),
  });
  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.message);
  }
};

export const deleteVTUReceiver = async (receiverId: string) => {
  const res = await fetchWithReAuth(`vtu/receivers/${receiverId}`, { method: 'DELETE' });
  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.message);
  }
};

export const createTransaction = async (transaction: VtuPurchaseType) => {
  const res = await fetchWithReAuth('vtu/transactions', {
    method: 'POST',
    body: JSON.stringify(transaction),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.transaction as IVtuTransaction;
};
