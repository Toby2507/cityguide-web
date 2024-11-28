'use server';

import {
  ICurrency,
  INightLife,
  INotification,
  IReservation,
  IRestaurant,
  ISPs,
  IStay,
  IVtuReceiver,
  IVtuService,
  IVtuTransaction,
  LatLng,
  PropertyType,
  VTUType,
} from '@/types';
import { fetchBaseQuery, fetchWithReAuth } from '@/utils';

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

export const getNightlifeSearch = async (geoLocation?: LatLng, day?: string, time?: string, minAge?: number) => {
  let url = 'property/nightlife/search';
  const params = [];
  if (geoLocation) params.push(`lat=${geoLocation.lat}&lng=${geoLocation.lng}`);
  if (day && time) params.push(`day=${day}&time=${time}`);
  if (minAge) params.push(`minAge=${minAge}`);
  if (params.length) url += `?${params.join('&')}`;
  const res = await fetchBaseQuery(url, { method: 'GET' });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.properties as INightLife[];
};

// Reservation
export const getReservationById = async (id: string) => {
  const res = await fetchWithReAuth(`reservation/${id}`, { method: 'GET' });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.reservation as IReservation;
};

export const getPropertyById = async (id: string, type: PropertyType) => {
  if (type === PropertyType.STAY) return await getStayById(id);
  return await getRestaurantById(id);
};

// Notifications
export const getNotifications = async () => {
  const res = await fetchWithReAuth('notification', { method: 'GET' });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.notifications as INotification[];
};

// VTU
export const getVtuTransactions = async () => {
  const res = await fetchWithReAuth('vtu/transactions', { method: 'GET' });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.transactions as IVtuTransaction[];
};

export const getVtuSavedReceivers = async () => {
  const res = await fetchWithReAuth('vtu/receivers', { method: 'GET' });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.receivers as IVtuReceiver[];
};

export const getVTUServices = async (type: VTUType, isp: ISPs) => {
  const res = await fetchWithReAuth(`vtu/services?type=${type}&isp=${isp}`, { method: 'GET' });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.services as IVtuService[];
};

// Miscellanous
export const getCurrencies = async () => {
  const res = await fetchWithReAuth('payment/currencies', { method: 'GET' });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  return result.currencies as ICurrency[];
};

export const getCurrencyExchangeRates = async (base: string, quote?: string, amount?: number) => {
  if (!base || base === '€$£') return null;
  let url = `payment/exchange-rate?base=${base}`;
  if (quote) url += `&currency=${quote}`;
  if (amount) url += `&amount=${amount}`;
  const res = await fetchWithReAuth(url, { method: 'GET' });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message);
  if (quote) return result as Record<string, number>;
  return result.exchangeRate as Record<string, number>;
};
