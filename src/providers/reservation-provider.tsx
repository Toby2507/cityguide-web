'use client';

import { createReservationStore } from '@/services';
import { IReservationStore } from '@/types';
import { createContext, ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand';

interface IReservationProvider {
  children: ReactNode;
}
type ReservationStoreAPI = ReturnType<typeof createReservationStore>;

const ReservationStoreContext = createContext<ReservationStoreAPI | undefined>(undefined);
export const ReservationStoreProvider = ({ children }: IReservationProvider) => {
  const storeRef = useRef<ReservationStoreAPI>();
  if (!storeRef.current) storeRef.current = createReservationStore();

  return <ReservationStoreContext.Provider value={storeRef.current}>{children}</ReservationStoreContext.Provider>;
};

const _useReservationStore = <T,>(selector: (store: IReservationStore) => T): T => {
  const reservationStoreContext = useContext(ReservationStoreContext);
  if (!reservationStoreContext) throw new Error('useReservationStore must be used within a ReservationStoreProvider');
  return useStore(reservationStoreContext, selector);
};

export const useReservationStore = () => _useReservationStore((state) => state);
