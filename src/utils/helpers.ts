import { IAddress, ICreateRestaurant, ICreateStay, ICustomAvailability } from '@/types';
import differenceWith from 'lodash/differenceWith';
import fromPairs from 'lodash/fromPairs';
import isEqual from 'lodash/isEqual';
import toPairs from 'lodash/toPairs';
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
  const number = (+value || 0).toFixed(2);
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

export const ratingRank = (rating: number, reviewCount: number) => {
  if (!reviewCount) return 'No Review Yet';
  if (rating >= 4.5) return 'Exceptional';
  if (rating >= 4.0) return 'Excellent';
  if (rating >= 3.5) return 'Very Good';
  if (rating >= 3.0) return 'Good';
  if (rating >= 2.5) return 'Above Average';
  if (rating >= 2.0) return 'Average';
  if (rating >= 1.5) return 'Below Average';
  if (rating >= 1.0) return 'Poor';
  if (rating >= 0.5) return 'Very Poor';
  return 'Unacceptable';
};

export const compactObject = (obj: Object): Object | undefined => {
  if (obj === null || obj === undefined) return undefined;
  if (Array.isArray(obj)) {
    const cleanedArray = obj.map((item) => compactObject(item)).filter((item) => item !== undefined);
    return cleanedArray.length ? cleanedArray : undefined;
  }
  if (typeof obj === 'object') {
    const cleaned = Object.entries(obj).reduce((acc: any, [key, value]) => {
      const cleanedValue = compactObject(value);
      if (cleanedValue !== undefined) acc[key] = cleanedValue;
      return acc;
    }, {});
    return Object.keys(cleaned).length ? cleaned : undefined;
  }
  return obj;
};

export const getObjDiff = (obj1: Object, obj2: Object) => {
  const cleanedObj1 = compactObject(obj1);
  const cleanedObj2 = compactObject(obj2);
  const diff = differenceWith(toPairs(cleanedObj1), toPairs(cleanedObj2), isEqual);
  return fromPairs(diff);
};
