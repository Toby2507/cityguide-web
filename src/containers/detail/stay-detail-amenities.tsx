import { amenities, otherAmenities } from '@/data';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { IoCheckmark } from 'react-icons/io5';

const StayDetailAmenities = () => {
  return (
    <section className="flex flex-col gap-4 pb-10" id="amenities">
      <header className="flex items-center justify-between gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold capitalize">Amenities of Eko hotel & Suites</h1>
          <p className="flex items-center gap-1 text-sm text-accentGray font-medium">
            Great amenities for your comfort! Review score, 8.5
          </p>
        </div>
        <Link href="#availability">
          <Button color="primary" className="px-10 font-semibold" radius="sm">
            Book now
          </Button>
        </Link>
      </header>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4">
          {amenities.map(({ name, Icon }, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2 pr-10 border rounded-md">
              <div className="p-2 rounded-md bg-secondary/50">
                <Icon color="#0075FF" size={24} />
              </div>
              <p className="text-sm font-medium">{name}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {otherAmenities.map((name, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <IoCheckmark color="#0075FF" size={20} />
              <p className="text-sm font-medium">{name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StayDetailAmenities;
