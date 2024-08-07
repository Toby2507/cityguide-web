import { CiParking1 } from 'react-icons/ci';
import { GrSwim } from 'react-icons/gr';
import { IoWifi, IoBeerOutline } from 'react-icons/io5';
import { MdOutlineSmokeFree, MdOutlineFreeBreakfast, MdOutlineFamilyRestroom, MdPets } from 'react-icons/md';
import { CgGym } from 'react-icons/cg';
import { RiRestaurantLine } from 'react-icons/ri';
import { TbDisabled } from 'react-icons/tb';

export const coreAmenities = [
  { name: 'Indoor Swimming Pool', Icon: GrSwim },
  { name: 'Free Parking', Icon: CiParking1 },
  { name: 'Free Wi-Fi', Icon: IoWifi },
  { name: 'Non-smoking rooms', Icon: MdOutlineSmokeFree },
  { name: 'Fitness Center', Icon: CgGym },
  { name: 'Restaurant', Icon: RiRestaurantLine },
  { name: 'Disabled Facilities', Icon: TbDisabled },
  { name: 'Bar', Icon: IoBeerOutline },
  { name: 'Very Good Breakfast', Icon: MdOutlineFreeBreakfast },
  { name: 'Family Rooms', Icon: MdOutlineFamilyRestroom },
  { name: 'Pets Allowed', Icon: MdPets },
];

export const otherAmenities = [
  'Dining table',
  'Stovetop',
  'Kitchenware',
  'Electric kettle',
  'Kitchen',
  'Washing machine',
  'Microwave',
  'Refrigerator',
  'Linens',
  'Wardrobe or closet',
  'Toilet paper',
  'Towels',
  'Bidet',
  'Guest bathroom',
  'Bathtub or shower',
  'Private Bathroom',
  'Toilet',
  'Free toiletries',
  'Hairdryer',
  'Shower',
  'Dining area',
  'Sofa',
  'Sitting area',
  'Streaming service (like Netflix)',
  'Flat-screen TV',
  'TV',
  'Tile/Marble floor',
  'Private entrance',
  'Fan',
  'Iron',
  'Outdoor dining area',
  'Outdoor furniture',
  'Patio',
  'Balcony',
  'Air conditioning',
  'Smoke-free property',
  'Elevator',
  'Family rooms',
  'Non-smoking rooms',
  'Fire extinguishers',
  'CCTV outside property',
  'CCTV in common areas',
  'Smoke alarms',
  'Security alarm',
  '24-hour security',
  'Safe',
];

export const staticAmenities = new Set([...coreAmenities.map((a) => a.name), ...otherAmenities]);
