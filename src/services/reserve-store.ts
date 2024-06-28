import { IReservationStore, PropertyType } from '@/types';
import { createStore } from 'zustand';

export const createReservationStore = () => {
  return createStore<IReservationStore>()((set, get) => ({
    reservations: [],
    addReservation: (reservation) => {
      const reservations = get().reservations;
      if (reservation.propertyType === PropertyType.STAY) {
        const res = reservations.find(
          (res) => res.property === reservation.property && res.roomId === reservation.roomId
        );
        if (res) return;
      } else {
        if (reservations.find((res) => res.property === reservation.property)) return;
      }
      set({ reservations: [...reservations, reservation] });
    },
    updateReservation: (id, type, reserve) => {
      const reservations = get().reservations;
      const reservation =
        type === PropertyType.STAY
          ? reservations.find((res) => res.property === id && res.roomId === reserve.roomId)
          : reservations.find((res) => res.property === id);
      if (reservation) {
        Object.assign(reservation, reserve);
        set({ reservations });
      }
    },
    removeReservation: (id, roomId) => {
      let reservations = get().reservations;
      reservations = reservations.filter((res) => res.property === id && res.roomId === roomId);
      set({ reservations });
    },
  }));
};
