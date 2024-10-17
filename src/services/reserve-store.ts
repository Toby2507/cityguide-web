import { IGuests, IReservationStore, PropertyType } from '@/types';
import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

export const createReservationStore = () => {
  return createStore<IReservationStore>()(
    persist(
      (set, get) => ({
        reservation: null,
        setReservation(reservation) {
          return set((state) => {
            if (
              !state.reservation ||
              !reservation ||
              (reservation.property && reservation.property !== state.reservation.property)
            )
              return { reservation };
            return { reservation: { ...state.reservation, ...reservation } };
          });
        },
        updateAccommodations(accommodation, unitPrice) {
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
          let price = reservation.price || 0;
          if (unitPrice) {
            const previousCount =
              reservation.accommodations?.find((a) => a.accommodationId === accommodation.accommodationId)
                ?.reservationCount || 0;
            if (price > 0) price -= previousCount * unitPrice;
            price += accommodation.reservationCount * unitPrice;
          }
          return set({ reservation: { ...reservation, accommodations, reservationCount, noOfGuests, price } });
        },
      }),
      {
        name: 'cityguide-reservation',
      }
    )
  );
};
