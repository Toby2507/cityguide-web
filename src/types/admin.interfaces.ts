import { EngagementType, Status } from './enums';
import { IReservation, IReview } from './model.interfaces';

export interface IReviewEngagement extends IReview {
  type: EngagementType;
  href: string;
}
export interface IReservationEngagement extends IReservation {
  type: EngagementType;
  href: string;
}

export interface IReservationStats {
  name: string;
  Reservations: number;
  'Cancelled Reservations': string;
}

export interface IAnalytics {
  stays: number;
  restaurants: number;
  nightlife: number;
  reservation: Record<Status, number>;
  engagements: (IReviewEngagement | IReservationEngagement)[];
}
