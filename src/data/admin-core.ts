import { EngagementType, IEngagement } from '@/types';
import { BiSupport } from 'react-icons/bi';
import { BsBarChartLine, BsListCheck } from 'react-icons/bs';
import { CiCreditCard1 } from 'react-icons/ci';
import { HiMiniSquare3Stack3D } from 'react-icons/hi2';
import { IoBedOutline, IoLogOutOutline, IoRestaurantOutline, IoSettingsOutline } from 'react-icons/io5';
import { MdFreeCancellation, MdPendingActions } from 'react-icons/md';
import { PiStackPlusFill, PiWine } from 'react-icons/pi';
import { RiDashboard2Line } from 'react-icons/ri';

export const adminNav = [
  { title: 'Dashboard', href: '/admin', Icon: RiDashboard2Line },
  { title: 'Stays', href: '/admin/stay', Icon: IoBedOutline },
  { title: 'Restaurants', href: '/admin/restaurant', Icon: IoRestaurantOutline },
  { title: 'Night Life', href: '/admin/nightlife', Icon: PiWine },
  { title: 'Reservations', href: '/admin/reservation', Icon: BsListCheck },
  { title: 'Payments', href: '/admin/#', Icon: CiCreditCard1 },
  { title: 'Reports', href: '/admin/#', Icon: BsBarChartLine },
  { title: 'Support', href: '/admin/#', Icon: BiSupport },
  { title: 'Settings', href: '/admin/#', Icon: IoSettingsOutline },
  { title: 'Logout', href: '/admin/#', Icon: IoLogOutOutline },
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

export const dateFilters = [
  { key: '6 day', label: 'Last 7 days' },
  { key: '1 month', label: 'Last 30 days' },
  { key: '2 month', label: 'Last 3 months' },
  { key: '5 month', label: 'Last 6 month' },
  { key: '11 month', label: 'Last 1 year' },
  { key: 'custom', label: 'Custom date' },
];

export const intervals = ['daily', 'weekly', 'monthly'];
