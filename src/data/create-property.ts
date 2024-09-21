import { NightLifeType, PriceRange, StayType } from '@/types';
import {
  FaCouch,
  FaGlassMartiniAlt,
  FaHotel,
  FaMapMarkerAlt,
  FaMusic,
  FaRegLightbulb,
  FaUmbrellaBeach,
} from 'react-icons/fa';
import { GiBunkBeds } from 'react-icons/gi';
import { IoBed, IoHome } from 'react-icons/io5';
import { MdOutlineApartment } from 'react-icons/md';

export const stayTypes = [
  {
    key: StayType.APARTMENT,
    name: 'Apartment',
    desc: 'Furnished and self-catering accommodations where guests rent the entire place.',
    Icon: IoHome,
  },
  {
    key: StayType.BnB,
    name: 'Bed and Breakfast',
    desc: 'Cozy, home-like accommodations offering private rooms and homemade breakfast in a personal setting.',
    Icon: IoBed,
  },
  {
    key: StayType.HOSTEL,
    name: 'Hostel',
    desc: 'Budget-friendly shared accommodations with communal spaces, ideal for social travelers.',
    Icon: GiBunkBeds,
  },
  {
    key: StayType.HOTEL,
    name: 'Hotel',
    desc: 'Professional accommodation offering private rooms, daily housekeeping, and on-site amenities.',
    Icon: FaHotel,
  },
  {
    key: StayType.RESORT,
    name: 'Resort',
    desc: 'All-inclusive destination properties with extensive recreational facilities and on-site entertainment.',
    Icon: FaUmbrellaBeach,
  },
  {
    key: StayType.OTHERS,
    name: 'Others',
    desc: "Unique or unconventional accommodations that don't fit traditional categories, such as treehouses, boats, or glamping sites.",
    Icon: MdOutlineApartment,
  },
];

export const priceRanges = [
  {
    key: PriceRange.BUDGET,
    name: 'Budget-friendly',
    desc: 'Affordable options that offer good value for money, typically with basic amenities and services.',
  },
  {
    key: PriceRange.MODERATE,
    name: 'Mid-range',
    desc: 'Comfortable accommodations or dining options with a balance between quality and price.',
  },
  {
    key: PriceRange.FINE,
    name: 'Fine-dining',
    desc: 'Premium options that offer luxury experiences with high-end amenities, services, and gourmet dining.',
  },
];

export const nightLifeTypes = [
  {
    key: NightLifeType.CLUB,
    name: 'Club',
    desc: 'Vibrant venues with dance floors, DJs, and late-night entertainment, often featuring electronic or popular music.',
    Icon: FaMusic,
  },
  {
    key: NightLifeType.BAR,
    name: 'Bar',
    desc: 'Establishments primarily serving alcoholic beverages, often with a casual atmosphere and sometimes offering light snacks or entertainment.',
    Icon: FaGlassMartiniAlt,
  },
  {
    key: NightLifeType.LOUNGE,
    name: 'Lounge',
    desc: 'Upscale, relaxed settings with comfortable seating, often featuring cocktails, ambient music, and a sophisticated atmosphere.',
    Icon: FaCouch,
  },
  {
    key: NightLifeType.ATTRACTION,
    name: 'Attraction',
    desc: 'Popular nightlife spots that draw large crowds for entertainment, sightseeing, or cultural experiences, such as live performances, rooftop bars, or night markets.',
    Icon: FaMapMarkerAlt,
  },
  {
    key: NightLifeType.OTHER,
    name: 'Other',
    desc: "Unique or unconventional nightlife venues that don't fit traditional categories, such as comedy clubs, karaoke bars, or themed experiences.",
    Icon: FaRegLightbulb,
  },
];
