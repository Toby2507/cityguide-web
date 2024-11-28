import { StaticImageData } from 'next/image';
import { EntityType } from './enums';
import { IFavProperties } from './model.interfaces';

// Stored Details
export interface IUserDetails {
  id: string;
  fullName: string;
  email: string;
  imgUrl: string;
  phoneNumber: string;
  isPartner: boolean;
  type: EntityType;
  favouriteProperties?: IFavProperties[];
  cardDetails: ICardDetails | null;
}

export interface ICardDetails {
  bin: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  card_type: string;
  bank: string;
  brand: string;
}

// External Data
export interface IOffers {
  id: string;
  name: string;
  description?: string;
  imgUrl: StaticImageData;
  link: string;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  imgUrl: string | null;
}

export interface IPayment {
  access_code?: string;
  amountPayed?: number;
  authorization_url?: string;
  convertedAmount?: number;
  message: string;
  reference: string;
  status: string;
}

export interface ICurrency {
  code: string;
  name: string;
  country: string;
}
