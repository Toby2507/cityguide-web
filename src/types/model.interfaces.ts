import { LatLng } from './common.interfaces';
import {
  DayOfWeek,
  EntityType,
  MaxDays,
  NightLifeType,
  Parking,
  PriceRange,
  PropertyType,
  Rating,
  Status,
  StayType,
} from './enums';

// General
export interface ISocialLink {
  name: string;
  handle: string;
}

export interface IContact {
  email: string;
  phone?: string;
  socialMedia?: ISocialLink[];
}

export interface IGuests {
  adults: number;
  children: number;
}

export interface IAddress {
  name: string;
  fullAddress?: string;
  locationId: string;
  city?: string;
  state: string;
  country: string;
  geoLocation: LatLng;
  extraDetails?: string;
}

export interface ICustomAvailability {
  day: DayOfWeek;
  from: string;
  to: string;
}

export interface IAvailability {
  type: 'ANYTIME' | 'CUSTOM';
  custom: ICustomAvailability[];
}

export interface IPartner {
  _id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  phoneNumber: string;
  email: string;
  imgUrl?: string;
  cancellationPolicy: ICancellation | null;
}

// NightLife
export interface IEvent {
  id: string;
  name: string;
  description: string;
  dates: { from: string; to: string }[];
  specialGuests: string[];
  price: number;
  imgUrl: string;
  availableTickets: number;
}

export interface INightLifeRules {
  minAge: number;
  parking: Parking;
  dressCode?: string[];
  musicGenre?: string[];
}

export interface INightLifeDetails {
  entryFee?: number;
  paymentOptions: string[];
  amenities: string[];
}

export interface INightLife {
  _id: string;
  establishment: string;
  type: NightLifeType;
  name: string;
  summary: string;
  description?: string;
  address: IAddress;
  rating: Rating;
  avatar: string;
  images: string[];
  availability: ICustomAvailability[];
  rules: INightLifeRules;
  details: INightLifeDetails;
  contact: IContact;
  createdAt: Date;
  updatedAt: Date;
}

// Restaurants
export interface IMenu {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  price?: number;
  category?: string[];
  dietaryRestrictions?: string[];
}

export interface IRestaurantDetails {
  delivery: boolean;
  reservation?: number;
  amenities?: string[];
  paymentOptions?: string[];
  children: boolean;
}

export interface IRestaurant {
  _id: string;
  name: string;
  summary: string;
  description?: string;
  address: IAddress;
  rating: Rating;
  avatar: string;
  images: string[];
  availability: ICustomAvailability[];
  priceRange: PriceRange;
  serviceStyle?: string[];
  cuisine?: string[];
  dietaryProvisions?: string[];
  menu: IMenu[];
  details: IRestaurantDetails;
  contact: IContact;
  createdAt: Date;
  updatedAt: Date;
  partner: string | IPartner;
}

// Stays
export interface IFurniture {
  type: string;
  count: number;
}

export interface IBreakfastInfo {
  price: number;
  options: string[];
}

export interface IRoom {
  name: string;
  furnitures: IFurniture[];
}

export interface IExtraInfo {
  host?: { name: string; info: string };
  property?: string;
  neighborhood?: {
    info?: string;
    locations?: { name: string; distance: string }[];
  };
}

export interface IStayRules {
  checkIn: string;
  checkOut: string;
  smoking: boolean;
  pets: boolean;
  parties: boolean;
}

export interface IAccommodation {
  id: string;
  name: string;
  description?: string;
  images: string[];
  rooms: IRoom[];
  maxGuests: number;
  bathrooms: number;
  children: boolean;
  infants: boolean;
  breakfast?: IBreakfastInfo;
  parking: Parking;
  size?: number;
  initialAvailable: number;
  available: number;
  amenities?: string[];
  price: number;
}

export interface ICancellation {
  daysFromReservation: number;
  percentRefundable: number;
}

export interface IStay {
  _id: string;
  partner: string | IPartner;
  partnerType: EntityType;
  type: StayType;
  name: string;
  summary: string;
  extraInfo?: IExtraInfo;
  address: IAddress;
  rating: number;
  avatar: string;
  images: string[];
  amenities: string[];
  hotelRating?: Rating;
  rules: IStayRules;
  accommodation: IAccommodation[];
  maxDays: MaxDays;
  language: string[];
  createdAt: string;
  updatedAt: string;
}

// Reservations
export interface IReservationUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  imgUrl: string | null;
}
export interface IReservationAccommodation {
  accommodationId: string;
  reservationCount: number;
  noOfGuests: IGuests;
}
export interface IReservation {
  _id: string;
  property: string;
  propertyType: PropertyType;
  user: string | IReservationUser;
  partner: string;
  partnerType: EntityType;
  isAgent?: boolean;
  guestFullName?: string;
  guestEmail?: string;
  requests?: string[];
  status: Status;
  checkInDay: string;
  checkInTime: string;
  checkOutDay: string;
  checkOutTime: string;
  accommodations?: IReservationAccommodation[];
  reservationCount: number;
  noOfGuests: IGuests;
  price?: number;
  createdAt: string;
  updatedAt: string;
}

export interface IReservationStats {
  name: string;
  Reservations: number;
  'Cancelled Reservations': string;
}
