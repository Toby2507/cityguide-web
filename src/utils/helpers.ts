import { IAddress, ICreateRestaurant, ICreateStay, ICustomAvailability } from '@/types';
import { KeyboardEvent } from 'react';

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

export const onEnter = (e: KeyboardEvent<HTMLInputElement>, cb: Function) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    cb();
  }
};

export const formatFileSize = (size: number) => {
  if (size === 0) return '0 Bytes';
  const k = 1000;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return parseFloat((size / Math.pow(k, i)).toFixed(0)) + ' ' + sizes[i];
};

export const formatStayBody = (body: ICreateStay) => {
  const stay: ICreateStay = {
    type: body.type,
    address: body.address,
    summary: body.summary,
    name: body.name,
    avatar: body.avatar,
    images: body.images,
    amenities: body.amenities,
    rules: body.rules,
    accommodation: body.accommodation,
    maxDays: body.maxDays,
    language: body.language.map((l) => l.trim()),
  };
  if (body.hotelRating) stay.hotelRating = body.hotelRating;
  const extras = body.extraInfo;
  if ((extras?.host?.info && extras.host.name) || extras?.property || extras?.neighborhood?.info)
    stay.extraInfo = body.extraInfo;
  if (body.optionalServices?.length) stay.optionalServices = body.optionalServices;
  return stay;
};

export const formatRestaurantBody = (body: ICreateRestaurant) => {
  const restaurant: ICreateRestaurant = {
    name: body.name,
    summary: body.summary,
    address: body.address,
    avatar: body.avatar,
    images: body.images,
    availability: body.availability.filter(Boolean) as ICustomAvailability[],
    priceRange: body.priceRange,
    serviceStyle: body.serviceStyle || [],
    cuisine: body.cuisine || [],
    dietaryProvisions: body.dietaryProvisions || [],
    menu: body.menu,
    details: {
      delivery: body.details.delivery,
      reservation: body.details.reservation ? body.details.reservation : undefined,
      amenities: body.details.amenities,
      paymentOptions: body.details.paymentOptions || [],
      children: body.details.children,
    },
    contact: body.contact,
  };
  return restaurant;
};

export const createUploadDatas = (imgs: File[]) => {
  const formDatas: FormData[] = [];
  for (let i = 0; i < imgs.length; i += 5) {
    const formData = new FormData();
    const imgBatch = imgs.slice(i, i + 5);
    imgBatch.forEach((img) => formData.append('images', img));
    formDatas.push(formData);
  }
  return formDatas;
};
