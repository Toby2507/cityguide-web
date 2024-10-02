'use server';

import {
  EngagementType,
  IAnalytics,
  INightLife,
  IReservation,
  IReservationStats,
  IRestaurant,
  IStay,
  PropertyType,
  Status,
} from '@/types';
import { fetchWithReAuth, paths } from '@/utils';

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

export const getPartnerReservation = async () => {
  const res = await fetchWithReAuth('reservation/partner', { method: 'GET' });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.reservations as IReservation[];
};

export const getAdminAnalytics = async () => {
  const res = await fetchWithReAuth('account/admin', { method: 'GET' });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  let data = result.analytics;

  const analytics: IAnalytics = {
    totalProperties: data.stays + data.restaurants + data.nightlifes,
    availableStays: data.stays,
    availableRestaurants: data.restaurants,
    availableNightlife: data.nightlife,
    totalReservations: Object.values<number>(data.reservation).reduce((a, b) => a + b, 0),
    pendingReservations: data.reservation[Status.PENDING],
    cancelledReservations: data.reservation[Status.CANCELLED],
    engagements: data.engagements.map((a: any) => {
      if (a.hasOwnProperty('categoryRatings')) return { ...a, type: EngagementType.REVIEW, href: '' };
      return {
        ...a,
        type: a.status === Status.CANCELLED ? EngagementType.CANCELLED : EngagementType.NEW,
        href: paths.adminReservation(a._id),
      };
    }),
  };
  return analytics as IAnalytics;
};
