'use server';

import { IReservationStats, IStay, PropertyType } from '@/types';
import { fetchBaseQuery, fetchWithReAuth } from '@/utils';

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
    const response = await res.json();
    return response.analytics as IReservationStats[];
  } catch (err: unknown) {
    return [];
  }
};

export const getPartnerStays = async () => {
  const res = await fetchWithReAuth('property/stay/admin', { method: 'GET' });
  const stays = await res.json();
  return stays.properties as IStay[];
};
