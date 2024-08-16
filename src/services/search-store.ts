import { ISearchStore } from '@/types';
import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

export const searchStore = () => {
  return createStore<ISearchStore>()(
    persist(
      (set, get) => ({
        location: null,
        checkInDay: '',
        checkOutDay: '',
        noOfGuests: { adults: 1, children: 0 },
        reservationCount: 1,
        setState(search) {
          set((state) => ({ ...state, ...search }));
        },
      }),
      { name: 'cityguide-search' }
    )
  );
};
