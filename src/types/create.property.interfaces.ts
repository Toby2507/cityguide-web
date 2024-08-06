import { MaxDays, Rating, StayType } from './enums';
import { IAccommodation, IAddress } from './model.interfaces';

export interface ICreateStay {
  type: StayType;
  name: string;
  summary: string;
  extraInfo?: {
    host?: {
      name: string;
      info: string;
    };
    property?: string;
    neighborhood?: string;
  };
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
