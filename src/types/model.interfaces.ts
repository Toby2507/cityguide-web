import { LatLng } from './common.interfaces';
import {
  DayOfWeek,
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
  establishment: string;
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
}

// Stays
export interface IBed {
  type: string;
  count: number;
}

export interface IRoom {
  name: string;
  beds: IBed[];
}

export interface IStayRules {
  checkIn: string;
  checkOut: string;
  smoking: boolean;
  pets: boolean;
  parties: boolean;
}

export interface IExtraInfo {
  host?: { name: string; info: string };
  property?: string;
  neighbourhood?: string;
}

export interface IAccommodation {
  id: string;
  name: string;
  description?: string;
  rooms: IRoom[];
  maxGuests: number;
  bathrooms: number;
  children: boolean;
  infants: boolean;
  breakfast: boolean;
  parking: Parking;
  size?: number;
  initialAvailable: number;
  available: number;
  amenities?: string[];
  price: number;
}

export interface IStay {
  _id: string;
  partner: string;
  partnerType: string;
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
export interface IReservation {
  _id: string;
  property: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    imgUrl: string | null;
  };
  propertyType: PropertyType;
  checkInDay: string;
  checkInTime: string;
  checkOutDay: string;
  checkOutTime: string;
  roomId?: string;
  reservationCount: number;
  status: Status;
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
