'use server';

import { PropertyType } from '@/types';
import { fetchWithReAuth } from '@/utils';
import { revalidatePath } from 'next/cache';

export const refetchPage = async (path: string) => {
  revalidatePath(path);
};

export const addFavouriteProperty = async (propertyId: string, propertyType: PropertyType, path: string) => {
  const res = await fetchWithReAuth('user/favproperty/add', {
    method: 'PATCH',
    body: JSON.stringify({ propertyId, propertyType }),
  });
  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.message);
  }
  revalidatePath(path);
};

export const removeFavouriteProperty = async (propertyId: string, path: string) => {
  const res = await fetchWithReAuth('user/favproperty/remove', {
    method: 'PATCH',
    body: JSON.stringify({ propertyId }),
  });
  if (!res.ok) {
    const result = await res.json();
    throw new Error(result.message);
  }
  revalidatePath(path);
};
