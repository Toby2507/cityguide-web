import { IOffers } from '@/types';
import offer1 from '@images/offer1.png';
import offer2 from '@images/offer2.png';

export const offers: IOffers[] = [
  {
    id: '1',
    name: 'Seize the opportunity',
    description: 'Save 15% or more when you book and stay before October 1, 2024.',
    imgUrl: offer1,
    link: 'Register',
  },
  {
    id: '2',
    name: 'Plan your summer',
    description:
      'This season, CityGuide is your gateway to incredible escapes, with breathtaking destinations and amazing accommodation options at unbeatable prices.',
    imgUrl: offer2,
    link: 'Find Gateway',
  },
];
