import { IOffers } from '@/types';
import offer1 from '@images/offer1.png';
import offer2 from '@images/offer2.png';
import service1 from '@images/demoservice1.png';
import service2 from '@images/demoservice2.png';
import service3 from '@images/demoservice7.png';
import service4 from '@images/demoservice8.png';
import service5 from '@images/demoservice9.png';
import service6 from '@images/demoservice10.png';

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

export const trendingPlaces: IOffers[] = [
  {
    id: '1',
    name: 'Sheraton Hotels',
    description:
      'Enjoy the best of luxury and comfort at Sheraton Hotels. With a wide range of services and amenities, you can be sure to have a memorable stay. We offer the best rates and discounts for your stay. Book now!',
    imgUrl: service2,
    link: '#',
  },
  {
    id: '2',
    name: 'Hilton Hotels',
    description:
      'Hilton Hotels is a leading global hospitality company, with a portfolio of 18 world-class brands comprising more than 6,300 properties and more than one million rooms, in 118 countries and territories. Book now!',
    imgUrl: service1,
    link: '#',
  },
  {
    id: '3',
    name: 'Marriott Hotels',
    description:
      'Marriott International is an American multinational diversified hospitality company that manages and franchises a broad portfolio of hotels and related lodging facilities. Book now!',
    imgUrl: service6,
    link: '#',
  },
  {
    id: '4',
    name: 'Radisson Hotels',
    description:
      'Radisson Hotels is an international hotel chain headquartered in the United States. A division of the Radisson Hotel Group, it operates the brands Radisson Blu, Radisson Red, Radisson Collection, Country Inn & Suites, and Park Inn by Radisson among others. Book now!',
    imgUrl: service4,
    link: '#',
  },
  {
    id: '5',
    name: 'Four Seasons Hotels',
    description:
      'Four Seasons Hotels and Resorts is a Canadian multinational hospitality company that manages luxury hotels and resorts around the world. Book now!',
    imgUrl: service5,
    link: '#',
  },
  {
    id: '6',
    name: 'InterContinental Hotels',
    description:
      'InterContinental Hotels & Resorts is a luxury hotel brand. It is part of InterContinental Hotels Group. As of November 2020, there are 210 InterContinental hotels featuring over 71,045 rooms worldwide. Book now!',
    imgUrl: service3,
    link: '#',
  },
];
