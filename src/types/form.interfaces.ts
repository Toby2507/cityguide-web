import { EntityType, MaxDays, NightLifeType, PriceRange, PropertyType, Rating, StayType } from './enums';
import {
  IAccommodation,
  IAddress,
  IContact,
  ICustomAvailability,
  IExtraInfo,
  IGuests,
  IMenu,
  INightLifeDetails,
  INightLifeRules,
  IOptionalService,
  IReservationAccommodation,
  IRestaurantDetails,
} from './model.interfaces';

// Creation Forms
export interface ICreateStay {
  type: StayType;
  name: string;
  summary: string;
  extraInfo?: IExtraInfo;
  address: IAddress;
  avatar: string;
  images: string[];
  amenities: string[];
  hotelRating?: Rating;
  rules: {
    checkIn: string;
    checkOut: string;
    smoking: boolean;
    pets: boolean;
    parties: boolean;
  };
  accommodation: IAccommodation[];
  maxDays: MaxDays;
  language: string[];
  paymentMethods: string[];
  optionalServices?: IOptionalService[];
}

export interface ICreateRestaurant {
  name: string;
  summary: string;
  address: IAddress;
  avatar: string;
  images: string[];
  availability: (ICustomAvailability | null)[];
  priceRange: PriceRange;
  serviceStyle?: string[];
  cuisine?: string[];
  dietaryProvisions?: string[];
  menu: IMenu[];
  details: IRestaurantDetails;
  contact: IContact;
}

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
  price?: number;
  isAgent?: boolean;
  guestFullName?: string;
  guestEmail?: string;
  requests?: string[];
  specialRequest?: string;
}

// Update Forms
export interface IUpdateStay {
  name?: string;
  summary?: string;
  extraInfo?: IExtraInfo;
  address?: IAddress;
  avatar?: string;
  images?: string[];
  amenities?: string[];
  hotelRating?: Rating;
  rules?: {
    checkIn: string;
    checkOut: string;
    smoking: boolean;
    pets: boolean;
    parties: boolean;
  };
  maxDays?: MaxDays;
  language?: string[];
  paymentMethods?: string[];
  optionalServices?: IOptionalService[];
}

export interface IUpdateRestaurant {
  name?: string;
  summary?: string;
  address?: IAddress;
  avatar?: string;
  images?: string[];
  availability?: (ICustomAvailability | null)[];
  priceRange?: PriceRange;
  serviceStyle?: string[];
  cuisine?: string[];
  dietaryProvisions?: string[];
  details?: IRestaurantDetails;
  contact?: IContact;
}

// Miscellaneous Forms
export interface IAccommodationForm {
  accommodation: IAccommodation[];
}

export interface IMenuForm {
  menu: IMenu[];
}
