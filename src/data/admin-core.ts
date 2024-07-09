import { EngagementType, IEngagement } from '@/types';
import { BiSupport } from 'react-icons/bi';
import { BsBarChartLine, BsListCheck } from 'react-icons/bs';
import { CiCreditCard1 } from 'react-icons/ci';
import { HiMiniSquare3Stack3D } from 'react-icons/hi2';
import { IoBedOutline, IoLogOutOutline, IoRestaurantOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdFreeCancellation, MdOutlineRateReview, MdPendingActions } from 'react-icons/md';
import { PiStackPlusFill, PiWine } from 'react-icons/pi';
import { RiDashboard2Line } from 'react-icons/ri';

export const adminNav = [
  { title: 'Dashboard', href: '/admin', Icon: RiDashboard2Line },
  { title: 'Stays', href: '/admin', Icon: IoBedOutline },
  { title: 'Restaurants', href: '/admin', Icon: IoRestaurantOutline },
  { title: 'Night Life', href: '/admin', Icon: PiWine },
  { title: 'Reservations', href: '/admin', Icon: BsListCheck },
  { title: 'Reviews', href: '/admin', Icon: MdOutlineRateReview },
  { title: 'Payments', href: '/admin', Icon: CiCreditCard1 },
  { title: 'Reports', href: '/admin', Icon: BsBarChartLine },
  { title: 'Support', href: '/admin', Icon: BiSupport },
  { title: 'Settings', href: '/admin', Icon: IoSettingsOutline },
  { title: 'Logout', href: '/admin', Icon: IoLogOutOutline },
];

export const metrics = [
  { id: 'properties', title: 'Total Properties', value: 0, href: '/admin', Icon: HiMiniSquare3Stack3D },
  { id: 'availableProp', title: 'Available Properties', value: 0, href: '/admin', Icon: PiStackPlusFill },
  { id: 'totalRes', title: 'Total Reservations', value: 0, href: '/admin', Icon: BsListCheck },
  { id: 'pendingRes', title: 'Pending Reservations', value: 0, href: '/admin', Icon: MdPendingActions },
  { id: 'cancelledRes', title: 'Cancelled Reservations', value: 0, href: '/admin', Icon: MdFreeCancellation },
];

export const engagements: IEngagement[] = [
  {
    id: '1',
    imgUrl: 'https://www.w3schools.com/howto/img_avatar2.png',
    name: 'John Doe',
    type: EngagementType.NEW,
    href: '/admin',
  },
  {
    id: '2',
    imgUrl: 'https://www.w3schools.com/howto/img_avatar2.png',
    name: 'John Doe',
    type: EngagementType.CANCELLED,
    href: '/admin',
  },
  {
    id: '3',
    imgUrl: 'https://www.w3schools.com/howto/img_avatar2.png',
    name: 'John Doe',
    type: EngagementType.NEW,
    href: '/admin',
  },
  {
    id: '4',
    imgUrl: 'https://www.w3schools.com/howto/img_avatar2.png',
    name: 'John Doe',
    type: EngagementType.REVIEW,
    href: '/admin',
  },
  {
    id: '5',
    imgUrl: 'https://www.w3schools.com/howto/img_avatar2.png',
    name: 'John Doe',
    type: EngagementType.NEW,
    href: '/admin',
  },
  {
    id: '6',
    imgUrl: 'https://www.w3schools.com/howto/img_avatar2.png',
    name: 'John Doe',
    type: EngagementType.REVIEW,
    href: '/admin',
  },
];

export const chartData = [
  {
    name: 'Jan',
    Reservations: 250,
    'Cancelled Reservations': 120,
  },
  {
    name: 'Feb',
    Reservations: 50,
    'Cancelled Reservations': 12,
  },
  {
    name: 'Mar',
    Reservations: 20,
    'Cancelled Reservations': 25,
  },
  {
    name: 'Apr',
    Reservations: 150,
    'Cancelled Reservations': 50,
  },
  {
    name: 'May',
    Reservations: 300,
    'Cancelled Reservations': 150,
  },
  {
    name: 'Jun',
    Reservations: 200,
    'Cancelled Reservations': 30,
  },
  {
    name: 'Jul',
    Reservations: 112,
    'Cancelled Reservations': 120,
  },
  {
    name: 'Aug',
    Reservations: 50,
    'Cancelled Reservations': 20,
  },
  {
    name: 'Sep',
    Reservations: 25,
    'Cancelled Reservations': 30,
  },
  {
    name: 'Oct',
    Reservations: 250,
    'Cancelled Reservations': 90,
  },
  {
    name: 'Nov',
    Reservations: 450,
    'Cancelled Reservations': 200,
  },
  {
    name: 'Dec',
    Reservations: 250,
    'Cancelled Reservations': 110,
  },
];
