import { IFullUser } from './auth.interfaces';
import { IUser, LatLng } from './common.interfaces';
import {
  DayOfWeek,
  EntityType,
  HotelRating,
  ISPs,
  MaxDays,
  NightLifeType,
  NotificationType,
  Parking,
  PriceRange,
  PropertyType,
  Rating,
  Status,
  StayType,
  VTUStatus,
  VTUType,
} from './enums';

// General
export interface IFavProperties {
  propertyId: string;
  propertyType: PropertyType;
}

export interface ISocialLink {
  name: string;
  handle: string;
}

export interface IContact {
  email: string;
  phone: string;
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

export interface ILocationInfo {
  distance: number;
  distanceInWords: string;
  duration: string;
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
  type: NightLifeType;
  name: string;
  summary: string;
  address: IAddress;
  rating: number;
  reviewCount: number;
  avatar: string;
  images: string[];
  availability: ICustomAvailability[];
  rules: INightLifeRules;
  details: INightLifeDetails;
  contact: IContact;
  locationInfo?: ILocationInfo;
  createdAt: string;
  updatedAt: string;
  partner: string | IPartner;
  categoryRatings: Record<string, number>;
  currency: string;
}

// Restaurants
export interface IMenu {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  price?: number;
  category?: string[];
  dietaryProvisions?: string[];
}

export interface IRestaurantReservation {
  price: number;
  max: number;
  available: number;
}

export interface IRestaurantDetails {
  delivery: boolean;
  reservation?: IRestaurantReservation;
  amenities: string[];
  paymentOptions: string[];
  children: boolean;
}

export interface IRestaurant {
  _id: string;
  name: string;
  summary: string;
  address: IAddress;
  rating: number;
  reviewCount: number;
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
  cancellationPolicy: ICancellation | null;
  locationInfo?: ILocationInfo;
  createdAt: string;
  updatedAt: string;
  partner: string | IPartner;
  categoryRatings: Record<string, number>;
  currency: string;
  proxyPaymentEnabled: boolean;
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

export interface IOptionalService {
  title: string;
  description: string;
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
  reviewCount: number;
  avatar: string;
  images: string[];
  amenities: string[];
  hotelRating?: HotelRating;
  rules: IStayRules;
  accommodation: IAccommodation[];
  maxDays: MaxDays;
  language: string[];
  paymentMethods: string[];
  optionalServices: IOptionalService[];
  cancellationPolicy: ICancellation | null;
  locationInfo?: ILocationInfo;
  createdAt: string;
  updatedAt: string;
  categoryRatings: Record<string, number>;
  currency: string;
  proxyPaymentEnabled: boolean;
}

// Reservations

export interface IReservationAccommodation {
  accommodationId: string;
  reservationCount: number;
  noOfGuests: IGuests;
}
export interface IReservation {
  _id: string;
  reservationRef: string;
  property: string;
  propertyType: PropertyType;
  user: string | IFullUser;
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

// Review
export interface IReview {
  _id: string;
  property: string;
  propertyType: PropertyType;
  user: string | IUser;
  categoryRatings: { [key: string]: Rating };
  rating: number;
  message: string;
  createdAt: string;
  updatedAt: string;
}

// Notification
export interface INotification {
  _id: string;
  recipient: string;
  recipientType: EntityType;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

// VTU Transaction
export interface IVtuTransaction {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  amount: number;
  currency: string;
  status: VTUStatus;
  network: ISPs;
  type: VTUType;
  createdAt: string;
  updatedAt: string;
}

export interface IVtuReceiver {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  network: ISPs;
  createdAt: string;
  updatedAt: string;
}

export interface IVtuService {
  id: string;
  amount: number;
  type: VTUType;
  value: string;
}
