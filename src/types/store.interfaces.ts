import { ICreateReservation } from './create.model.interfaces';
import { PropertyType } from './enums';
import { IReservationAccommodation } from './model.interfaces';

// Reservation
export interface IReservationState {
  reservation: Partial<ICreateReservation> | null;
}

export interface IReservationStore extends IReservationState {
  setReservation: (reservation: Partial<ICreateReservation>) => void;
  updateAccommodations: (accommodation: IReservationAccommodation) => void;
  updateRequests: (request: string) => void;
}
