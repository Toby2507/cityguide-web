import { Button } from '@nextui-org/react';
import { IoBedOutline, IoRestaurantOutline } from 'react-icons/io5';
import { PiWine } from 'react-icons/pi';
import { RiShareCircleLine } from 'react-icons/ri';

const services = [
  { name: 'Stays', icon: <IoBedOutline /> },
  { name: 'Restaurants', icon: <IoRestaurantOutline /> },
  { name: 'Night Life', icon: <PiWine /> },
  { name: 'Airtime Topup', icon: <RiShareCircleLine /> },
];

const ServiceNav = () => {
  return (
    <ul className="flex items-center justify-center flex-wrap gap-4 pb-16">
      {services.map(({ name, icon }, idx) => (
        <Button key={`${name}-${idx}`} className="text-white" startContent={icon} radius="full" variant="light">
          {name}
        </Button>
      ))}
    </ul>
  );
};

export default ServiceNav;
