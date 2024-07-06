import { IAddress } from '@/types';

export const addressFormatter = (res: google.maps.places.PlaceResult): IAddress => {
  return {
    name: res.name!,
    fullAddress: res.formatted_address,
    locationId: res.place_id!,
    city: res.address_components?.find((comp) => comp.types.includes('administrative_area_level_2'))?.long_name,
    state: res.address_components?.find((comp) => comp.types.includes('administrative_area_level_1'))?.long_name || '',
    country: res.address_components?.find((comp) => comp.types.includes('country'))?.long_name || '',
    geoLocation: { lat: res.geometry?.location?.lat()!, lng: res.geometry?.location?.lng()! },
  };
};

export const numberFormat = (number: number) => {
  number = number || 0;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const numberToCurrency = (value: number, prefix: boolean = false) => {
  const number = (value || 0).toFixed(2);
  const [currency, decimal] = number.split('.');
  if (prefix && value < 1000000) return `₦${Math.ceil(value / 1000)}K`;
  if (prefix && value >= 1000000) return `₦${Math.ceil(value / 1000000)}M`;
  return `₦${numberFormat(+currency)}.${decimal}`;
};
