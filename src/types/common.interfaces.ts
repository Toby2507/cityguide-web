import { StaticImageData } from 'next/image';

// Stored Details
export interface IUserDetails {
  id: string;
  fullName: string;
  imgUrl: string;
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
