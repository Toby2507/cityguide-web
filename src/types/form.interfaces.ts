import { EntityType, MaxDays, PriceRange, PropertyType, Rating, StayType } from './enums';
import {
  IAccommodation,
  IAddress,
  IContact,
  ICustomAvailability,
  IExtraInfo,
  IGuests,
  IMenu,
  IOptionalService,
  IReservationAccommodation,
  IRestaurantDetails,
} from './model.interfaces';

// Stay
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
  optionalServices?: IOptionalService[];
}
export interface IUpdateStay {
  name?: string;
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
  optionalServices?: IOptionalService[];
}
export interface IAccommodationForm {
  accommodation: IAccommodation[];
}

// Restaurant
export interface ICreateRestaurant {
  name: string;
  summary: string;
  description?: string;
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

// Reservation
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
