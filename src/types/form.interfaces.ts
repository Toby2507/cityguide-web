import { EntityType, HotelRating, ISPs, MaxDays, NightLifeType, PriceRange, PropertyType, StayType } from './enums';
import {
  IAccommodation,
  IAddress,
  ICancellation,
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
  currency: string;
  proxyPaymentEnabled?: boolean;
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
export interface IUpdateStay {
  name?: string;
  summary?: string;
  extraInfo?: IExtraInfo;
  address?: IAddress;
  avatar?: string;
  images?: string[];
  amenities?: string[];
  hotelRating?: HotelRating;
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
  currency?: string;
  proxyPaymentEnabled?: boolean;
  optionalServices?: IOptionalService[];
  cancellationPolicy?: ICancellation;
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
  currency?: string;
  proxyPaymentEnabled?: boolean;
  cancellationPolicy?: ICancellation;
}

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
export interface IAccommodationForm {
  accommodation: IAccommodation[];
}

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
