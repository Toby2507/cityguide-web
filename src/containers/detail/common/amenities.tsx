import { coreAmenities } from '@/data';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { IconType } from 'react-icons';
import { IoCheckmark } from 'react-icons/io5';

interface Props {
  amenities: string[];
  name: string;
  onUpdate?: () => void;
}
interface ICore {
  name: string;
  Icon: IconType;
}

const DetailPageAmenities = ({ amenities, name, onUpdate }: Props) => {
  let core: ICore[] = [];
  let custom: string[] = [];
  amenities?.forEach((amenity) => {
    const isCore = coreAmenities.find((a) => a.name === amenity);
    if (isCore) core.push(isCore);
    else custom.push(amenity);
  });
  return (
    <section className="flex flex-col gap-4 pb-10" id="amenities">
      <header className="flex items-center justify-between gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold capitalize">Amenities of {name}</h1>
          <p className="flex items-center gap-1 text-sm text-accentGray font-medium">
            Great amenities for your comfort! Review score, 8.5
          </p>
        </div>
        {onUpdate ? (
          <Button color="primary" className="px-10 font-semibold" onPress={onUpdate} radius="sm">
            Update Amenities
          </Button>
        ) : (
          <Link href="#availability">
            <Button color="primary" className="px-10 font-semibold" radius="sm">
              Reserve now
            </Button>
          </Link>
        )}
      </header>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4">
          {core.map(({ name, Icon }, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2 pr-10 border rounded-md">
              <div className="p-2 rounded-md bg-secondary/50">
                <Icon color="#0075FF" size={24} />
              </div>
              <p className="text-sm font-medium">{name}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {custom.map((name, idx) => (
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

export default DetailPageAmenities;
