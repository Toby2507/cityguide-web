import { LatLng } from './common.interfaces';
import { Parking } from './enums';

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

export interface IBed {
  type: string;
  count: number;
}

export interface IAccommodation {
  id: string;
  name: string;
  description?: string;
  rooms: { name: string; beds: IBed[] }[];
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
