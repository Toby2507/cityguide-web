'use client';

import { useSearchStore } from '@/providers';
import { NavTabs } from '@/types';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { IoBedOutline, IoRestaurantOutline } from 'react-icons/io5';
import { PiWine } from 'react-icons/pi';
import { RiShareCircleLine } from 'react-icons/ri';

interface IServices {
  name: string;
  key: NavTabs;
  icon: JSX.Element;
}
const services: IServices[] = [
  { name: 'Stays', key: 'Stay', icon: <IoBedOutline size={20} /> },
  { name: 'Restaurants', key: 'Restaurant', icon: <IoRestaurantOutline size={20} /> },
  { name: 'Night Life', key: 'Nightlife', icon: <PiWine size={20} /> },
  { name: 'Airtime Topup', key: 'Airtime', icon: <RiShareCircleLine size={20} /> },
];

const ServiceNav = () => {
  const { activeTab, setActiveTab } = useSearchStore();
  const { push } = useRouter();

  const handleNav = (key: NavTabs) => {
    setActiveTab(key);
    push(`/${key.toLowerCase()}`);
  };
  return (
    <ul className="flex items-center justify-center flex-wrap gap-4 pb-2">
      {services.map(({ name, icon, key }) => (
        <Button
          key={key}
          className={`text-white ${key === activeTab ? 'border border-white bg-white/10' : ''}`}
          onPress={() => handleNav(key)}
          startContent={icon}
          radius="full"
          variant="light"
        >
          {name}
        </Button>
      ))}
    </ul>
  );
};

export default ServiceNav;
