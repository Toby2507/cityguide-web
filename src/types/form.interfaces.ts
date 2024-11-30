import { EntityType, ISPs, NightLifeType, PropertyType } from './enums';
import {
  IAddress,
  IContact,
  ICustomAvailability,
  IGuests,
  IMenu,
  INightLifeDetails,
  INightLifeRules,
  IReservationAccommodation,
} from './model.interfaces';

// Creation Forms

export interface ICreateNightlife {
  type: NightLifeType;
  name: string;
  summary: string;
  address: IAddress;
  avatar: string;
  images: string[];
  availability: (ICustomAvailability | null)[];
  rules: INightLifeRules;
  details: INightLifeDetails;
  contact: IContact;
  currency: string;
}

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

// Update Forms
export interface IUpdateNightlife {
  type?: NightLifeType;
  name?: string;
  summary?: string;
  address?: IAddress;
  avatar?: string;
  images?: string[];
  availability?: (ICustomAvailability | null)[];
  rules?: INightLifeRules;
  details?: INightLifeDetails;
  contact?: IContact;
  currency?: string;
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
