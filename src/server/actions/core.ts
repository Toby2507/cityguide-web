'use server';

import { PropertyType } from '@/types';
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
