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
