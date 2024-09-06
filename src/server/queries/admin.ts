'use server';

import { INightLife, IReservationStats, IRestaurant, IStay, PropertyType } from '@/types';
import { fetchWithReAuth } from '@/utils';

interface IGetResAnalytics {
  property?: string;
  propertyType?: PropertyType;
  from: string;
  to: string;
  interval: 'daily' | 'weekly' | 'monthly';
}

export const getReservationAnalytics = async (data: IGetResAnalytics): Promise<IReservationStats[]> => {
  try {
    const res = await fetchWithReAuth('reservation/analytics', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.message);
    return result.analytics as IReservationStats[];
  } catch (err: unknown) {
    return [];
  }
};

export const getPartnerStays = async () => {
  const res = await fetchWithReAuth('property/stay/admin', { method: 'GET' });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.properties as IStay[];
};

export const getPartnerRestaurants = async () => {
  const res = await fetchWithReAuth('property/restaurant/admin', { method: 'GET' });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.properties as IRestaurant[];
};

export const getPartnerNightlifes = async () => {
  const res = await fetchWithReAuth('property/nightlife/admin', { method: 'GET' });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.properties as INightLife[];
};
