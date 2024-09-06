'use server';

import { INightLife, IRestaurant, IStay, LatLng } from '@/types';
import { fetchBaseQuery } from '@/utils';

// Stays
export const getTrendingStays = async () => {
  const res = await fetchBaseQuery('property/stay/trending', { method: 'GET' });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.properties as IStay[];
};

export const getStayById = async (id: string) => {
  const res = await fetchBaseQuery(`property/stay/${id}`, { method: 'GET' });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.stay as IStay;
};

export const getStaySearch = async (
  geoLocation?: LatLng,
  checkIn?: string,
  checkOut?: string,
  children?: boolean,
  guest?: number,
  count?: number
) => {
  let url = 'property/stay/search';
  const params = [];
  if (geoLocation) params.push(`lat=${geoLocation.lat}&lng=${geoLocation.lng}`);
  if (checkIn && checkOut) params.push(`checkin=${checkIn}&checkout=${checkOut}`);
  if (children) params.push('children=0');
  if (guest) params.push(`guests=${guest}`);
  if (count) params.push(`count=${count}`);
  if (params.length) url += `?${params.join('&')}`;
  const res = await fetchBaseQuery(url, { method: 'GET' });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.properties as IStay[];
};

// Restaurants
export const getTrendingRestaurants = async () => {
  const res = await fetchBaseQuery('property/restaurant/trending', { method: 'GET' });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.properties as IRestaurant[];
};

export const getRestaurantById = async (id: string) => {
  const res = await fetchBaseQuery(`property/restaurant/${id}`, { method: 'GET' });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.restaurant as IRestaurant;
};

export const getRestaurantSearch = async (
  geoLocation?: LatLng,
  day?: string,
  time?: string,
  children?: boolean,
  guest?: number,
  count?: number
) => {
  let url = 'property/restaurant/search';
  const params = [];
  if (geoLocation) params.push(`lat=${geoLocation.lat}&lng=${geoLocation.lng}`);
  if (children) params.push('children=0');
  if (guest) params.push(`guests=${guest}`);
  if (count) params.push(`count=${count}`);
  if (day && time) params.push(`day=${day}&time=${time}`);
  if (params.length) url += `?${params.join('&')}`;
  const res = await fetchBaseQuery(url, { method: 'GET' });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.properties as IRestaurant[];
};

// Night Life
export const getTrendingNightlifes = async () => {
  const res = await fetchBaseQuery('property/nightlife/trending', { method: 'GET' });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.properties as INightLife[];
};

export const getNightlifeById = async (id: string) => {
  const res = await fetchBaseQuery(`property/nightlife/${id}`, { method: 'GET' });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.nightlife as INightLife;
};
