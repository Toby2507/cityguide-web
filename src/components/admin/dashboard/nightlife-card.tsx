'use client';

import { RatingCard } from '@/components';
import { usePriceConversion } from '@/hooks';
import { INightLife } from '@/types';
import { paths } from '@/utils';
import { Button, Chip, Image, Link } from '@nextui-org/react';
import { GiDress } from 'react-icons/gi';
import { IoCalendarSharp, IoCard, IoCheckmark } from 'react-icons/io5';
import { PiMusicNoteFill } from 'react-icons/pi';
import { TbParkingCircle } from 'react-icons/tb';

const NightlifeCard = ({
  _id,
  avatar,
  address,
  name,
  rating,
  reviewCount,
  type,
  summary,
  currency,
  details: { amenities, entryFee, paymentOptions },
  rules: { minAge, parking, dressCode, musicGenre },
}: INightLife) => {
  const { convertPrice } = usePriceConversion();
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
    <article className="grid grid-cols-10 gap-6 border rounded-xl p-3 bg-white shadow-2xl">
      <figure className="h-full col-span-3 w-full">
        <Image
          src={avatar}
          width="full"
          alt={name}
          radius="none"
          className="w-full object-cover rounded-2xl aspect-square"
        />
      </figure>
      <section className="col-span-7 flex flex-col gap-4 py-2 pr-4">
        <Chip size="sm" className="text-sm" color="primary" radius="sm" variant="flat">
          <span className="text-xs font-medium tracking-wider">{type}</span>
        </Chip>
        <header className="flex justify-between gap-10 w-full">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl text-primary font-semibold tracking-wide">{name}</h3>
            <p className="text-xs text-primary underline">{validAddr}</p>
          </div>
          <RatingCard rating={rating} reviewCount={reviewCount} />
        </header>
        <p className="text-sm">{summary.split('\n')[0]}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {amenities.slice(0, 10).map((amenity) => (
            <div key={amenity} className="flex items-center gap-1">
              <IoCheckmark color="#0075FF" size={20} />
              <p className="text-sm font-medium">{amenity}</p>
            </div>
          ))}
        </div>
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
                {convertPrice(entryFee, currency)}
                <span className="text-xs tracking-normal"> / Person</span>
              </p>
            ) : null}
            <Link href={paths.adminNightlife(_id)}>
              <Button color="primary" radius="sm" className="font-medium tracking-wide px-8">
                View Nightlife
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
};

export default NightlifeCard;
