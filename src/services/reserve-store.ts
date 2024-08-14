import { IGuests, IReservationStore, PropertyType } from '@/types';
import { createStore } from 'zustand';

export const createReservationStore = () => {
  return createStore<IReservationStore>()((set, get) => ({
    reservation: null,
    setReservation(reservation) {
      return set((state) => {
        if (!state.reservation || reservation.property !== state.reservation.property) return { reservation };
        return { reservation: { ...state.reservation, ...reservation } };
      });
    },
    updateAccommodations(accommodation) {
      const reservation = get().reservation;
      if (!reservation?.property && reservation?.propertyType !== PropertyType.STAY) return;
      const accs = reservation.accommodations || [];
      const accommodations = accs
        .filter((a) => a.accommodationId !== accommodation.accommodationId)
        .concat(accommodation.reservationCount ? [accommodation] : []);
      const reservationCount = accommodations.reduce((acc, curr) => acc + curr.reservationCount, 0);
      const noOfGuests: IGuests = {
        adults: accommodations.reduce((acc, curr) => acc + curr.noOfGuests.adults, 0),
        children: accommodations.reduce((acc, curr) => acc + curr.noOfGuests.children, 0),
      };
      return set({ reservation: { ...reservation, accommodations, reservationCount, noOfGuests } });
    },
    updateRequests(request) {
      const reservation = get().reservation;
      if (!reservation?.property) return;
      const requests = Array.from(new Set([...(reservation.requests || []), request]));
      return set({ reservation: { ...reservation, requests } });
    },
  }));
};
