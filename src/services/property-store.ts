import { IPropertyStore } from '@/types';
import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

export const propertyStore = () => {
  return createStore<IPropertyStore>()(
    persist(
      (set) => ({
        stay: null,
        restaurant: null,
        nightlife: null,
        setStay(info) {},
        setRestaurant(info) {},
        setNightlife(info) {},
      }),
      { name: 'cityguide-property' }
    )
  );
};
