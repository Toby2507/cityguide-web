import { Button, Input } from '@nextui-org/react';
import { IoBedOutline, IoRestaurantOutline } from 'react-icons/io5';
import { PiWine } from 'react-icons/pi';
import { RiShareCircleLine } from 'react-icons/ri';

const services = [
  { name: 'Stays', icon: <IoBedOutline /> },
  { name: 'Restaurants', icon: <IoRestaurantOutline /> },
  { name: 'Night Clubs', icon: <PiWine /> },
  { name: 'Airtime Topup', icon: <RiShareCircleLine /> },
];

const Hero = () => {
  return (
    <div className="relative bg-primary">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <ul className="flex items-center justify-center flex-wrap gap-4 pb-20">
          {services.map(({ name, icon }, idx) => (
            <Button key={`${name}-${idx}`} className="text-white" startContent={icon} radius="full" variant="light">
              {name}
            </Button>
          ))}
        </ul>
        <div className="flex flex-col gap-6 justify-center pb-10">
          <h1 className="text-white text-6xl font-bold text-center leading-tight">
            Discover the best
            <br />
            accomodations, dining and <br />
            night life
          </h1>
          <p className="text-white text-base text-center max-w-screen-sm mx-auto">
            Plan your perfect getaway with Cityguidesx. Find the best hotels, villas, apartments, restaurants, and
            nightclubs.
          </p>
          <Button className="bg-[#AED4FF] text-primary max-w-fit mx-auto" variant="flat">
            Learn more
          </Button>
        </div>
        {/* <div className="flex flex-col justify-center gap-6">
          <Input
            placeholder="Find a place to stay..."
            type="search"
            color="default"
            className="py-2 w-2/3 mx-auto"
            size="lg"
            startContent={<div className="w-1" />}
            endContent={
              <Button className="bg-[#AED4FF] text-primary max-w-fit mx-auto my-2 -right-2" variant="flat">
                Search
              </Button>
            }
          />
        </div> */}
      </div>
      {/* <HeroCarousel /> */}
    </div>
  );
};

export default Hero;
