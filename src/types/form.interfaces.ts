import { EntityType, ISPs, PropertyType } from './enums';
import {
  IGuests,
  IMenu,
  IReservationAccommodation
} from './model.interfaces';

// Creation Forms
export interface ICreateReservation {
  property: string;
  propertyType: PropertyType;
  partner: string;
  partnerType: EntityType;
  checkInDay: string;
  checkInTime: string;
  checkOutDay: string;
  checkOutTime: string;
  accommodations?: IReservationAccommodation[];
  reservationCount: number;
  noOfGuests: IGuests;
  price: number;
  currency: string;
  convertedPriceNGN?: number;
  isAgent?: boolean;
  guestFullName?: string;
  guestEmail?: string;
  requests?: string[];
  specialRequest?: string;
  payReference?: string;
  useSavedCard?: boolean;
  saveCard?: boolean;
  payByProxy: boolean;
}

// Miscellaneous Forms
export interface IMenuForm {
  menu: IMenu[];
}

// VTU
export interface ISavedReceiverForm {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  network: ISPs;
}
