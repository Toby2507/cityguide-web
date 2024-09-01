'use server';

import { IRestaurant, IStay, LatLng } from '@/types';
import { fetchBaseQuery } from '@/utils';
import toast from 'react-hot-toast';

// Stays
export const getTrendingStays = async () => {
  const res = await fetchBaseQuery('property/stay/trending', { method: 'GET' });
  const stays = await res.json();
  return stays.properties as IStay[];
};

export const getStayById = async (id: string) => {
  const res = await fetchBaseQuery(`property/stay/${id}`, { method: 'GET' });
  if (res.status !== 200) {
    toast.error(res.statusText);
    return;
  }
  const stay = await res.json();
  return stay.stay as IStay;
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
  const stays = await res.json();
  return stays.properties as IStay[];
};

// Restaurants
export const getTrendingRestaurants = async () => {
  const res = await fetchBaseQuery('property/restaurant/trending', { method: 'GET' });
  const restaurants = await res.json();
  return restaurants.properties as IRestaurant[];
};

export const getRestaurantById = async (id: string) => {
  const res = await fetchBaseQuery(`property/restaurant/${id}`, { method: 'GET' });
  if (res.status !== 200) {
    toast.error(res.statusText);
    return;
  }
  const restaurant = await res.json();
  return restaurant.restaurant as IRestaurant;
};
