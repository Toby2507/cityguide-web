import { Socket } from 'socket.io-client';
import { NavTabs, PropertyType, Status } from './enums';
import { ICreateNightlife, ICreateReservation, ICreateRestaurant, ICreateStay } from './form.interfaces';
import {
  IAccommodation,
  IAddress,
  IGuests,
  IMenu,
  INightLife,
  INotification,
  IReservation,
  IReservationAccommodation,
  IRestaurant,
  IReview,
  IStay,
} from './model.interfaces';
import { ICurrency } from './common.interfaces';

// Reservation
export interface IReservationState {
  reservation: Partial<ICreateReservation> | null;
}
export interface IReservationStore extends IReservationState {
  setReservation: (reservation: Partial<ICreateReservation>) => void;
  clearReservation: () => void;
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

// Create Property
interface IPropertyBase {
  step: number;
  topStep: number;
}
export interface IProperty {
  stay: (IPropertyBase & { property: Partial<ICreateStay> }) | null;
  restaurant: (IPropertyBase & { property: Partial<ICreateRestaurant> }) | null;
  nightlife: (IPropertyBase & { property: Partial<ICreateNightlife> }) | null;
}
export interface IPropertyStore extends IProperty {
  setStay: (info: Partial<IProperty['stay']>) => void;
  setRestaurant: (info: Partial<IProperty['restaurant']>) => void;
  setNightlife: (info: Partial<IProperty['nightlife']>) => void;
}
export type IPropertyValues = IProperty['stay'] | IProperty['restaurant'] | IProperty['nightlife'];
export type ISetProperty = IPropertyStore['setStay'] | IPropertyStore['setRestaurant'] | IPropertyStore['setNightlife'];

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
  new_review: (data: { property: string; type: PropertyType; review: Partial<IReview> }) => void;
  delete_review: (data: { property: string; type: PropertyType; reviewId: string }) => void;
  new_notification: (notification: Partial<INotification>) => void;
}
export type TAction = 'add' | 'update' | 'remove';

export type TSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

// General
export interface IGeneral {
  currency: ICurrency | null;
  exchangeRates: Record<string, number> | null;
}

export interface IGeneralStore extends IGeneral {
  setCurrency: (currency: ICurrency) => void;
  setExchangeRates: (exchangeRates: Record<string, number> | null) => void;
}
