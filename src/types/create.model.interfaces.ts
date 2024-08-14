import { EntityType, MaxDays, PropertyType, Rating, StayType } from './enums';
import { IAccommodation, IAddress, IExtraInfo, IGuests, IReservationAccommodation } from './model.interfaces';

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
}
