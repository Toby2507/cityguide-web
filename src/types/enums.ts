export enum EntityType {
  USER = 'User',
  ESTABLISHMENT = 'Establishment',
}

export enum Roles {
  Admin = 'admin',
  User = 'user',
}

export enum PropertyType {
  STAY = 'Stay',
  RESTAURANT = 'Restaurant',
  NIGHTLIFE = 'NightLife',
}

export enum StayType {
  HOTEL = 'Hotel',
  HOSTEL = 'Hostel',
  RESORT = 'Resort',
  APARTMENT = 'Apartment',
  BnB = 'BnB',
  OTHERS = 'Others',
}

export enum NightLifeType {
  CLUB = 'Club',
  BAR = 'Bar',
  LOUNGE = 'Lounge',
  ATTRACTION = 'Attraction',
  OTHER = 'Other',
}

export enum Status {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  INHOUSE = 'In House',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export enum HotelRating {
  NO_RATING,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
}

export enum Rating {
  ZERO,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
}

export enum Parking {
  FREE = 'Free',
  PAID = 'Paid',
  NO = 'No',
}

export enum MaxDays {
  DEFAULT = 28,
  QUARTER = 45,
  HALF = 60,
  FULL = 90,
}

export enum PriceRange {
  BUDGET = 'Budget-friendly',
  MODERATE = 'Mid-range',
  FINE = 'Fine-dining',
}

export enum DayOfWeek {
  MONDAY = 'Monday',
  TUESDAY = 'Tuesday',
  WEDNESDAY = 'Wednesday',
  THURSDAY = 'Thursday',
  FRIDAY = 'Friday',
  SATURDAY = 'Saturday',
  SUNDAY = 'Sunday',
}

export enum EngagementType {
  NEW = 'New Reservation',
  CANCELLED = 'Cancelled Reservation',
  REVIEW = 'Review',
}

export enum NotificationType {
  RESERVATION = 'Reservation',
  REVIEW = 'Review',
}

export type Updates = 'details' | 'images' | 'rules' | 'accommodation' | 'map' | 'amenities' | 'menu' | 'info';

export type NavTabs = 'Stay' | 'Restaurant' | 'Nightlife' | 'Airtime';
