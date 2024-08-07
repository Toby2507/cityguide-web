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
  OTHER = 'Other',
}

export enum Status {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  CANCELLED = 'Cancelled',
  COMPLETED = 'Completed',
}

export enum Rating {
  NO_RATING,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
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
