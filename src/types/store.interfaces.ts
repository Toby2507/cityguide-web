import { ICreateReservation } from './form.interfaces';
import { IAddress, IGuests, IReservationAccommodation } from './model.interfaces';

// Reservation
export interface IReservationState {
  reservation: Partial<ICreateReservation> | null;
}

export interface IReservationStore extends IReservationState {
  setReservation: (reservation: Partial<ICreateReservation>) => void;
  updateAccommodations: (accommodation: IReservationAccommodation, unitPrice?: number) => void;
}

// Search
export interface ISearch {
  location: IAddress | null;
  checkInDay: string;
  checkOutDay: string;
  noOfGuests: IGuests;
  reservationCount: number;
}

export interface ISearchStore extends ISearch {
  setState: (search: Partial<ISearch>) => void;
}
