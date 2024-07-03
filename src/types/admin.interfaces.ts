import { EngagementType } from './enums';

export interface IEngagement {
  id: string;
  imgUrl: string;
  name: string;
  type: EngagementType;
  href: string;
}
