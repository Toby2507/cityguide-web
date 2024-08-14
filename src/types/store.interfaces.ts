import { ICreateReservation } from './create.model.interfaces';
import { IReservationAccommodation } from './model.interfaces';

// Reservation
export interface IReservationState {
  reservation: Partial<ICreateReservation> | null;
}

export interface IReservationStore extends IReservationState {
  setReservation: (reservation: Partial<ICreateReservation>) => void;
  updateAccommodations: (accommodation: IReservationAccommodation, unitPrice?: number) => void;
  updateRequests: (request: string) => void;
}
