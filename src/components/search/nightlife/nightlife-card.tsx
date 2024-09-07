'use client';

import { RatingCard } from '@/components';
import { INightLife } from '@/types';
import { numberToCurrency, paths } from '@/utils';
import { Button, Chip, Image, Link } from '@nextui-org/react';
import { GiDress } from 'react-icons/gi';
import { IoCalendarSharp, IoCard } from 'react-icons/io5';
import { PiMusicNoteFill } from 'react-icons/pi';
import { TbParkingCircle } from 'react-icons/tb';

const SearchNightlifeCard = ({
  _id,
  address,
  avatar,
  locationInfo,
  rating,
  reviewCount,
  name,
  type,
  details: { entryFee, paymentOptions },
  rules: { minAge, parking, dressCode, musicGenre },
}: INightLife) => {
  const validAddr =
    address.fullAddress || [address.name, address.city, address.state, address.country].filter(Boolean).join(', ');
  const nightlifeDetails = [
    { title: 'Parking', value: parking, Icon: TbParkingCircle },
    { title: 'Min age', value: `${minAge}+ years`, Icon: IoCalendarSharp },
    { title: 'Payment', value: paymentOptions.join(', '), Icon: IoCard },
  ];
  if (dressCode) nightlifeDetails.push({ title: 'Dress code', value: dressCode?.join(', '), Icon: GiDress });
  if (musicGenre) nightlifeDetails.push({ title: 'Music Genre', value: musicGenre?.join(', '), Icon: PiMusicNoteFill });
  return (
    <article className="grid grid-cols-10 gap-4 border rounded-xl p-2 bg-white shadow-lg">
      <figure className="col-span-3 h-full w-full">
        <Image
          src={avatar}
          width="full"
          alt={name}
          radius="sm"
          className="aspect-square object-cover rounded-xl w-full"
        />
      </figure>
      <div className="col-span-7 flex flex-col gap-1 pr-1">
        <Chip size="sm" className="text-sm" color="primary" radius="sm" variant="flat">
          <span className="text-xs font-medium tracking-wider">{type}</span>
        </Chip>
        <div className="flex flex-col gap-4">
          <header className="flex justify-between gap-6 w-full">
            <div className="flex flex-col max-w-fit">
              <h3 className="text-xl text-primary font-semibold tracking-wide">{name}</h3>
              <p className="text-xs text-primary underline">{validAddr}</p>
              {locationInfo ? (
                <p className="text-xs text-gray-600">
                  {locationInfo.distanceInWords} / {locationInfo.duration} from the selected location.
                </p>
              ) : null}
            </div>
            <RatingCard rating={rating} reviewCount={reviewCount} size="sm" />
          </header>
          <div className="border-l border-accentGray2 pl-4 flex gap-10">
            <div className="flex-1 flex flex-col gap-2">
              <p className="font-bold">Nightlife Details</p>
              <div className="flex flex-wrap items-center gap-2">
                {nightlifeDetails.map(({ title, value, Icon }) => (
                  <div key={title} className="flex items-center gap-1">
                    <Icon color="text-default" size={16} />
                    <p className="text-xs font-light">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start gap-2">
              <p className="text-xs font-light">{entryFee ? 'Entry fee required' : 'No entry fee required'}</p>
              {entryFee ? (
                <p className="text-2xl tracking-tighter font-medium">
                  {numberToCurrency(entryFee)}
                  <span className="text-xs tracking-normal"> / Person</span>
                </p>
              ) : null}
              <Link href={paths.nightlifeDetail(_id)}>
                <Button color="primary" radius="sm" className="font-medium tracking-wide px-8">
                  View Nightlife
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SearchNightlifeCard;
