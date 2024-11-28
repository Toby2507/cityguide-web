import { ISPs } from '@/types';
import { paths } from '@/utils';
import { Library } from '@googlemaps/js-api-loader';
import etisalat from '@icons/9mobile.svg';
import airtel from '@icons/airtel.svg';
import glo from '@icons/glo.svg';
import mtn from '@icons/mtn.svg';

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

export const airtimeNav = [
  { title: 'Dashboard', href: '/airtime/dashboard' },
  { title: 'Transaction History', href: '/airtime/dashboard/history' },
  { title: 'Saved Receivers', href: '/airtime/dashboard/receivers' },
  { title: 'Purchase Airtime', href: '/airtime/dashboard/purchase/airtime' },
  { title: 'Purchase Data', href: '/airtime/dashboard/purchase/data' },
];

export const airtimeTransactionsColumns = [
  { key: 'user', label: 'User' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
];

export const airtimeReceiversColumns = [
  { key: 'name', label: 'Name' },
  { key: 'phone', label: 'Phone' },
  { key: 'action', label: 'Action' },
];

export const airtimeNetworks = [
  { value: ISPs.AIRTEL, label: 'AIRTEL', icon: airtel, color: '#E42424' },
  { value: ISPs.MTN, label: 'MTN', icon: mtn, color: '#FFC107' },
  { value: ISPs.GLO, label: 'GLO', icon: glo, color: '#308E34' },
  { value: ISPs.ETISALAT, label: '9MOBILE', icon: etisalat, color: '#EBEBEB' },
];
