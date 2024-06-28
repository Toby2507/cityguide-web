import { PropertyType } from './enums';
import { IReservation } from './model.interfaces';

// Reservation
export interface IReservationState {
  reservations: IReservation[];
}

export interface IReservationStore extends IReservationState {
  addReservation: (reservation: IReservation) => void;
  updateReservation: (id: string, type: PropertyType, reserve: Partial<IReservation>) => void;
  removeReservation: (id: string, roomId?: string) => void;
}
