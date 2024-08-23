import { CustomStars } from '@/components';
import { IStay } from '@/types';
import { numberToCurrency } from '@/utils';
import { Button, Chip, Image } from '@nextui-org/react';
import { FaChildren } from 'react-icons/fa6';
import { IoFastFoodOutline } from 'react-icons/io5';
import { LuBaby, LuParkingCircle } from 'react-icons/lu';
import { PiBathtub } from 'react-icons/pi';
import { TbMeterSquare } from 'react-icons/tb';

const StayCard = ({
  avatar,
  name,
  summary,
  extraInfo,
  type,
  accommodation,
  address,
  rating,
  reviewCount,
  hotelRating,
}: IStay) => {
  const validAddr =
    address.fullAddress || [address.name, address.city, address.state, address.country].filter(Boolean).join(', ');
  let neighborhood = '';
  if (extraInfo?.neighborhood)
    extraInfo.neighborhood.locations?.slice(0, 2).forEach((e) => (neighborhood += `• ${e.distance} from ${e.name} `));
  const accommodationDetails = [
    { title: 'bathrooms', value: `${accommodation[0].bathrooms} bathrooms`, Icon: PiBathtub },
    {
      title: 'children',
      value: accommodation[0].children ? 'Children allowed' : 'Children not allowed',
      Icon: FaChildren,
    },
    { title: 'infants', value: accommodation[0].infants ? 'Infants allowed' : 'Infants not allowed', Icon: LuBaby },
    { title: 'parking', value: `${accommodation[0].parking} parking`, Icon: LuParkingCircle },
    { title: 'size', value: `${accommodation[0].size} m²`, Icon: TbMeterSquare },
    {
      title: 'breakfast',
      value: !!accommodation[0].breakfast ? (accommodation[0].breakfast.price ? 'Paid' : 'Free') : 'No',
      Icon: IoFastFoodOutline,
    },
  ];
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
            <div className="flex items-center gap-4">
              <h3 className="text-xl text-primary font-semibold tracking-wide">{name}</h3>
              {hotelRating && <CustomStars value={hotelRating} />}
            </div>
            <p className="text-xs text-primary underline">{validAddr}</p>
            <p className="text-xs text-gray-600">{neighborhood}</p>
          </div>
          <div className="flex items-center justify-end gap-2">
            <div className="flex flex-col items-end">
              <p className="text-primary font-bold">Exceptional</p>
              <p className="text-xs text-accentGray font-medium">
                {reviewCount} review{reviewCount === 1 ? '' : 's'}
              </p>
            </div>
            <p className="bg-primary p-3 rounded-ee-lg rounded-t-lg text-white text-xl">{rating.toFixed(1)}</p>
          </div>
        </header>
        <p className="text-sm">{summary.split('\n')[0]}</p>
        <div className="border-l border-accentGray2 pl-4 flex gap-10">
          <div className="flex-1 flex flex-col gap-2">
            <p className="font-bold">{accommodation[0].name}</p>
            <div className="flex flex-wrap items-center gap-2">
              {accommodationDetails.map(({ title, value, Icon }) => (
                <div key={title} className="flex items-center gap-1">
                  <Icon color="text-default" size={16} />
                  <p className="text-xs font-light">{value}</p>
                </div>
              ))}
            </div>
            <ul className="flex flex-col">
              {accommodation[0].rooms.map((room, idx) => (
                <li key={idx}>
                  <span className="text-xs font-semibold">{room.name}: </span>
                  <span className="text-[10px]">
                    {room.furnitures.map((bed) => `${bed.count} ${bed.type} bed`).join(', ')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-end gap-2">
            <p className="text-xs font-light">1 night, {accommodation[0].maxGuests} guests</p>
            <p className="text-3xl tracking-tighter font-medium">{numberToCurrency(accommodation[0].price)}</p>
            <Button color="primary" radius="sm" className="font-medium tracking-wide px-12">
              View Stay
            </Button>
          </div>
        </div>
      </section>
    </article>
  );
};

export default StayCard;
