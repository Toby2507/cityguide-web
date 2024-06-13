import { LatLng } from './common.interfaces';

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
