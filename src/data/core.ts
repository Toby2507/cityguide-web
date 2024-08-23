import { Library } from '@googlemaps/js-api-loader';

export const LIBS: Library[] = ['core', 'maps', 'places', 'marker'];

export const footerLinks = [
  {
    category: 'Services',
    links: [
      { title: 'Stays', href: '#' },
      { title: 'Restaurants', href: '#' },
      { title: 'Night Clubs', href: '#' },
      { title: 'Airtime Topup', href: '#' },
    ],
  },
  {
    category: 'Useful Links',
    links: [
      { title: 'About Us', href: '#' },
      { title: 'FAQ', href: '#' },
      { title: 'Press', href: '#' },
    ],
  },
  {
    category: 'Support',
    links: [
      { title: 'Help center', href: '#' },
      { title: 'Account information', href: '#' },
      { title: 'Talk to support', href: '#' },
      { title: 'Account information', href: '#' },
    ],
  },
];
