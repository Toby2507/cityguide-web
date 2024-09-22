import { IPropertyStore } from '@/types';
import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = { step: 1, topStep: 1, property: {} };

export const propertyStore = () => {
  return createStore<IPropertyStore>()(
    persist(
      (set) => ({
        stay: null,
        restaurant: null,
        nightlife: null,
        setStay(info) {
          return set((state) => {
            if (!info) return { stay: null };
            if (!state.stay) return { stay: { ...initialState, ...info } };
            return { stay: { ...state.stay, ...info } };
          });
        },
        setRestaurant(info) {
          return set((state) => {
            if (!info) return { restaurant: null };
            if (!state.restaurant) return { restaurant: { ...initialState, ...info } };
            return { restaurant: { ...state.restaurant, ...info } };
          });
        },
        setNightlife(info) {
          return set((state) => {
            if (!info) return { nightlife: null };
            if (!state.nightlife) return { nightlife: { ...initialState, ...info } };
            return { nightlife: { ...state.nightlife, ...info } };
          });
        },
      }),
      { name: 'cityguide-property' }
    )
  );
};
