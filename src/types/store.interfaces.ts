import { NavTabs } from './enums';
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
  checkInDay: string;
  checkOutDay: string;
  location: IAddress | null;
  noOfGuests: IGuests;
  reservationCount: number;
  activeTab: NavTabs;
}

export interface ISearchStore extends ISearch {
  setActiveTab: (activeTab: NavTabs) => void;
  setState: (search: Partial<ISearch>) => void;
}
