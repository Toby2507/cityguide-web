import { DayOfWeek, PriceRange } from '@/types';
import { boolean, nativeEnum, number, object, string } from 'zod';

export const createRestaurantSchema = object({
  name: string({ required_error: 'Restaurant Name is required' }).min(
    3,
    'Restaurant name requires atleast 3 characters'
  ),
  summary: string({ required_error: 'Summary of the restaurant is required' }).min(
    10,
    'Summary should be atleast 10 characters'
  ),
  description: string().min(10, 'Description should be atleast 10 characters').optional(),
  address: object(
    {
      name: string({ required_error: 'Address name is required' }),
      fullAddress: string().optional(),
      locationId: string({ required_error: 'Address location id is required' }),
      city: string().optional(),
      state: string({ required_error: 'State is required' }),
      country: string({ required_error: 'Country is required' }),
      geoLocation: object({
        lat: number({
          required_error: 'Latitude is required',
          invalid_type_error: 'Latitude has to be a number',
        }),
        lng: number({
          required_error: 'Longitude is required',
          invalid_type_error: 'Longitude has to be a number',
        }),
      }),
      extraDetails: string().optional(),
    },
    { required_error: 'Address is required' }
  ),
  avatar: string({ required_error: 'Avatar is required' }),
  images: string({ required_error: 'Images is required', invalid_type_error: 'Images should be an array' })
    .array()
    .min(11, 'Atleast 11 images are required'),
  availability: object(
    {
      day: nativeEnum(DayOfWeek, {
        required_error: 'Day is required',
        invalid_type_error: 'Day should be a day of the week in full and capitalized',
      }),
      from: string({ required_error: 'Open time is required for each open days' }),
      to: string({ required_error: 'Close time is required for each open days' }),
    },
    { required_error: 'Availability is required', invalid_type_error: 'Availability should be an object' }
  )
    .array()
    .min(1, 'Restaurant should be open atleast 1 day a week'),
  priceRange: nativeEnum(PriceRange, {
    required_error: 'Price range is required',
    invalid_type_error: 'Price range should be Budget-friendly | Mid-range | Fine-dining',
  }),
  serviceStyle: string({ invalid_type_error: 'Service style should be an array' }).array().optional(),
  cuisine: string({ invalid_type_error: 'Cuisine should be an array' }).array().optional(),
  dietaryProvisions: string({ invalid_type_error: 'Dietary provisions should be an array' }).array().optional(),
  menu: object(
    {
      id: string({ required_error: 'Menu item id is required' }),
      name: string({ required_error: 'Menu item name is required' }).min(
        3,
        'Menu item name should be atleast 3 characters'
      ),
      description: string({ required_error: 'Menu item description is required' }).min(
        10,
        'Menu item description should be atleast 10 characters'
      ),
      imgUrl: string({ required_error: 'Menu item image is required' }),
      price: number({ invalid_type_error: 'Menu item price should be a number' }).optional(),
      category: string({ invalid_type_error: 'Menu item category should be an array' }).array().optional(),
      dietaryProvisions: string({ invalid_type_error: 'Menu item dietary provisions should be an array' })
        .array()
        .optional(),
    },
    { required_error: 'Menu item is required', invalid_type_error: 'Menu item should be an array' }
  )
    .array()
    .min(1, 'Atleast one menu item is required'),
  details: object(
    {
      delivery: boolean({
        required_error: 'Delivery availability is required',
        invalid_type_error: 'Delivery availability should be a boolean',
      }),
      reservation: number({ invalid_type_error: 'Max number of guests for reservation should be number' }).optional(),
      amenities: string({ invalid_type_error: 'Amenities should be an array' }).array().optional(),
      paymentOptions: string({ invalid_type_error: 'Payment options should be an array' }).array().optional(),
      children: boolean({
        required_error: 'Children allowance rule is required',
        invalid_type_error: 'Children allowance rule should be a boolean',
      }),
    },
    { required_error: 'Restaurant details is required' }
  ),
  contact: object(
    {
      email: string({ required_error: 'Email is required' }).email('Email should be a valid email'),
      phone: string().min(11, 'Invalid phone number').optional(),
      socialMedia: object(
        {
          name: string({ required_error: 'Social media name is required' }).min(
            3,
            'Platform name should be atleast 3 characters'
          ),
          handle: string({ required_error: 'Social media handle is required' }).min(
            1,
            'Handle name should be atleast 1 character'
          ),
        },
        { required_error: 'Social media is required', invalid_type_error: 'Social media should be an array' }
      )
        .array()
        .optional(),
    },
    { required_error: 'Contact is required' }
  ),
});
