import { ISPs } from '@/types';
import { paths } from '@/utils';
import { Library } from '@googlemaps/js-api-loader';
import etisalat from '@icons/9mobile.svg';
import airtel from '@icons/airtel.svg';
import glo from '@icons/glo.svg';
import mtn from '@icons/mtn.svg';

// About
export const aboutData1 = [
  'Lorem ipsum dolor sit amet consectetur. Tempus amet non facilisis ac dolor ipsum sit viverra. Velit ut donec in sed. Proin pharetra vel ut mi malesuada. Aliquam a ultrices nec amet. Nec viverra sapien dignissim quam ipsum quam in purus. In egestas netus curabitur suspendisse neque magnis magna nisi. Velit quisque amet pretium proin mauris lacus risus.',
  'Faucibus vitae gravida nunc venenatis at. Quam adipiscing suspendisse duis lorem in sed augue. Urna tristique duis bibendum tempus. Venenatis egestas sagittis massa dictumst ac quis. Est enim orci eros nisl nunc nibh morbi aenean. Volutpat morbi mi ut viverra metus volutpat leo. Ullamcorper adipiscing scelerisque adipiscing nibh. Mauris quis elementum quis vitae eget arcu et ultrices. Morbi sapien enim sed eget pretium placerat risus vehicula id. Vestibulum euismod adipiscing mauris convallis. Cum nibh nibh mattis quisque facilisis amet feugiat libero rhoncus.',
  'Odio sit potenti mi consequat hendrerit. Feugiat integer non laoreet tincidunt. Pellentesque adipiscing elementum ultrices sit ultricies diam cras. Iaculis neque vel volutpat aliquam non vestibulum sit consequat. Lacus tristique tellus viverra mauris venenatis tristique vel sed.',
  'Adipiscing arcu ac lacinia in malesuada fermentum suspendisse cras auctor. Turpis parturient ipsum consequat malesuada eget aliquam vivamus. Massa euismod risus natoque interdum tristique hendrerit enim nulla in. Augue posuere eget tellus ut purus integer amet nibh mauris. Volutpat ut quam libero sit pretium at non habitant nec. Vulputate amet purus dictum semper suspendisse amet faucibus pharetra dignissim. Scelerisque amet tellus metus diam egestas massa. Nunc sed in auctor',
];

export const aboutData2 = [
  'Lorem ipsum dolor sit amet consectetur. Tempus amet non facilisis ac dolor ipsum sit viverra. Velit ut donec in sed. Proin pharetra vel ut mi malesuada. Aliquam a ultrices nec amet. Nec viverra sapien dignissim quam ipsum quam in purus. In egestas netus curabitur suspendisse neque magnis magna nisi. Velit quisque amet pretium proin mauris lacus risus.',
  'Faucibus vitae gravida nunc venenatis at. Quam adipiscing suspendisse duis lorem in sed augue. Urna tristique duis bibendum tempus. Venenatis egestas sagittis massa dictumst ac quis. Est enim orci eros nisl nunc nibh morbi aenean. Volutpat morbi mi ut viverra metus volutpat leo. Ullamcorper adipiscing scelerisque adipiscing nibh. Mauris quis elementum quis vitae eget arcu et ultrices. Morbi sapien enim sed eget pretium placerat risus vehicula id. Vestibulum euismod adipiscing mauris convallis. Cum nibh nibh mattis quisque facilisis amet feugiat libero rhoncus.',
  'Odio sit potenti mi consequat hendrerit. Feugiat integer non laoreet tincidunt. Pellentesque adipiscing elementum ultrices sit ultricies diam cras. Iaculis neque vel volutpat aliquam non vestibulum sit consequat. Lacus tristique tellus viverra mauris venenatis tristique vel sed.',
];

// Misc
export const LIBS: Library[] = ['core', 'maps', 'places', 'marker'];

// Footer
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
      { title: 'Airtime Topup', href: paths.vtu() },
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
      { title: 'About CityGuideX', href: paths.about() },
      { title: 'How we work', href: '#' },
      { title: 'Sustainability', href: '#' },
      { title: 'Press centre', href: '#' },
      { title: 'Careers', href: '#' },
      { title: 'Corporate contact', href: '#' },
    ],
  },
];

// VTU
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
  { title: 'Dashboard', href: '/vtu/dashboard' },
  { title: 'Transaction History', href: '/vtu/dashboard/history' },
  { title: 'Saved Receivers', href: '/vtu/dashboard/receivers' },
  { title: 'Purchase Airtime', href: '/vtu/dashboard/purchase/airtime' },
  { title: 'Purchase Data', href: '/vtu/dashboard/purchase/data' },
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
