import { IGeneralStore } from '@/types';
import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

export const generalStore = () => {
  return createStore<IGeneralStore>()(
    persist(
      (set) => ({
        currency: null,
        exchangeRates: null,
        setCurrency(currency) {
          return set({ currency });
        },
        setExchangeRates(exchangeRates) {
          return set({ exchangeRates });
        },
      }),
      { name: 'cityguide-general' }
    )
  );
};
