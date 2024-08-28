'use server';

import { IRestaurant, IStay } from '@/types';
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

// Restaurants
export const getRestaurantById = async (id: string) => {
  const res = await fetchBaseQuery(`property/restaurant/${id}`, { method: 'GET' });
  if (res.status !== 200) {
    toast.error(res.statusText);
    return;
  }
  const restaurant = await res.json();
  return restaurant.restaurant as IRestaurant;
};
