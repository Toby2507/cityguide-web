import { BiSupport } from 'react-icons/bi';
import { BsBarChartLine, BsListCheck } from 'react-icons/bs';
import { CiCreditCard1 } from 'react-icons/ci';
import { GoHome } from 'react-icons/go';
import { IoBedOutline, IoLogOutOutline, IoRestaurantOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineRateReview, MdPendingActions, MdFreeCancellation } from 'react-icons/md';
import { HiMiniSquare3Stack3D } from 'react-icons/hi2';
import { PiWine, PiStackPlusFill } from 'react-icons/pi';
import { EngagementType, IEngagement } from '@/types';

export const adminNav = [
  { title: 'Dashboard', href: '/admin', Icon: GoHome },
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
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
