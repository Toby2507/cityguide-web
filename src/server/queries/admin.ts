'use server';

import { PropertyType } from '@/types';
import { fetchBaseQuery } from '@/utils';

interface IGetResAnalytics {
  property?: string;
  propertyType?: PropertyType;
  from: string;
  to: string;
  interval: 'daily' | 'weekly' | 'monthly';
}

export const getReservationAnalytics = async (data: IGetResAnalytics) => {
  try {
    const res = await fetchBaseQuery('reservation/analytics', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const response = await res.json();
    return response.analytics;
  } catch (err: unknown) {
    console.log(err);
  }
};
