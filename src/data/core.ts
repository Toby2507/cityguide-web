import { paths } from '@/utils';
import { Library } from '@googlemaps/js-api-loader';

export const LIBS: Library[] = ['core', 'maps', 'places', 'marker'];

export const footerLinks = [
  {
    category: 'Support',
    links: [
      { title: 'Manage your trips', href: '#' },
      { title: 'Contact Customer Service', href: '#' },
      { title: 'Help Center', href: '#' },
    ],
  },
  {
    category: 'Discover',
    links: [
      { title: 'Seasonal and holiday deals', href: '#' },
      { title: 'Travel articles', href: '#' },
      { title: 'Sign up as an establishment', href: paths.register() },
      { title: 'Stays', href: paths.stays() },
      { title: 'Restaurants', href: paths.restaurants() },
      { title: 'Night Clubs', href: paths.nightlifes() },
      { title: 'Airtime Topup', href: paths.airtime() },
    ],
  },
  {
    category: 'Terms and Settings',
    links: [
      { title: 'Privacy Policy', href: '#' },
      { title: 'Terms and Conditions', href: '#' },
      { title: 'Dispute resolution', href: '#' },
      { title: 'Company Details', href: '#' },
    ],
  },
  {
    category: 'Partners',
    links: [
      { title: 'Manage properties', href: paths.admin() },
      { title: 'List your property', href: paths.listProperty() },
      { title: 'Admin login', href: paths.login() },
    ],
  },
  {
    category: 'About',
    links: [
      { title: 'About CityGuideX', href: '#' },
      { title: 'How we work', href: '#' },
      { title: 'Sustainability', href: '#' },
      { title: 'Press centre', href: '#' },
      { title: 'Careers', href: '#' },
      { title: 'Corporate contact', href: '#' },
    ],
  },
];

export const airtimeData = [
  {
    title: 'Excellent Customer Support',
    description:
      'Our well trained customer support agents are always available 24/7 to help you resolve any issues. We provide you with multiple ways to reach us and get fast help.',
  },
  {
    title: 'Fast Service Delivery',
    description:
      'Enjoy prompt delivery of services purchased through Cityguidex. Our promise to you is to deliver value for every transaction made on-time, every time.',
  },
  {
    title: 'Safe and Secure Payment',
    description:
      'Payment on Cityguidex is fast and 100% secured. Enjoy seamless payment processes with zero glitches. Pay with wallet, bank transfer or card.',
  },
];
