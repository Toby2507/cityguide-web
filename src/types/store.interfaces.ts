import { Server } from 'http';
import { NavTabs, PropertyType, Status } from './enums';
import { ICreateReservation } from './form.interfaces';
import {
  IAccommodation,
  IAddress,
  IGuests,
  IMenu,
  INightLife,
  IReservation,
  IReservationAccommodation,
  IRestaurant,
  IReview,
  IStay,
} from './model.interfaces';
import { Socket } from 'socket.io-client';

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
  minAge: number;
  activeTab: NavTabs;
}

export interface ISearchStore extends ISearch {
  setActiveTab: (activeTab: NavTabs) => void;
  setState: (search: Partial<ISearch>) => void;
}

// Socket
export interface ClientToServerEvents {
  add_user: (userId: string) => void;
}
export interface ServerToClientEvents {
  restaurant_menu: (data: { id: string; action: TAction; menuId?: string; body?: IMenu[] | IMenu }) => void;
  stay_acc: (data: { id: string; action: TAction; accId?: string; body?: IAccommodation[] | IAccommodation }) => void;
  update_property: (data: { id: string; type: PropertyType; body: Partial<IStay | IRestaurant | INightLife> }) => void;
  delete_property: (data: { id: string; type: PropertyType }) => void;
  new_reservation: (reservation: Partial<IReservation>) => void;
  update_reservation: (data: { reservationId: string; status: Status }) => void;
  new_review: (data: { establishmentId: string; review: Partial<IReview> }) => void;
  delete_review: (data: { establishmentId: string; reviewId: string }) => void;
}
export type TAction = 'add' | 'update' | 'remove';

export type TSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
