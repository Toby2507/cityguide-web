import { ISearchStore } from '@/types';
import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

export const searchStore = () => {
  return createStore<ISearchStore>()(
    persist(
      (set) => ({
        activeTab: 'Stay',
        checkInDay: '',
        checkOutDay: '',
        location: null,
        noOfGuests: { adults: 1, children: 0 },
        reservationCount: 1,
        minAge: 0,
        setActiveTab(activeTab) {
          set({ activeTab });
        },
        setState(search) {
          set((state) => ({ ...state, ...search }));
        },
      }),
      { name: 'cityguide-search' }
    )
  );
};
