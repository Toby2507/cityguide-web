import { MaxDays, Rating, StayType } from './enums';
import { IAccommodation, IAddress, IExtraInfo } from './model.interfaces';

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
