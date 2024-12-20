'use client';

import { RatingCard } from '@/components';
import { usePriceConversion } from '@/hooks';
import { IRestaurant } from '@/types';
import { paths } from '@/utils';
import { Button, Chip, Image } from '@nextui-org/react';
import Link from 'next/link';
import { FaChildren } from 'react-icons/fa6';
import { GrDeliver } from 'react-icons/gr';
import { IoCard, IoCheckmark, IoPricetags } from 'react-icons/io5';
import { LuVegan } from 'react-icons/lu';
import { MdFoodBank, MdRoomService } from 'react-icons/md';

const RestaurantCard = ({
  _id,
  address,
  avatar,
  cuisine,
  dietaryProvisions,
  name,
  priceRange,
  rating,
  reviewCount,
  serviceStyle,
  summary,
  currency,
  details: { amenities, children, delivery, paymentOptions, reservation },
}: IRestaurant) => {
  const { convertPrice } = usePriceConversion();
  const validAddr =
    address.fullAddress || [address.name, address.city, address.state, address.country].filter(Boolean).join(', ');
  const restaurantDetails = [
    { title: 'Service Style', value: serviceStyle?.join(', '), Icon: MdRoomService },
    { title: 'Dietary Provisions', value: dietaryProvisions?.join(', '), Icon: LuVegan },
    { title: 'Cuisines', value: cuisine?.join(', '), Icon: MdFoodBank },
    {
      title: 'Children',
      value: children ? 'Children allowed' : 'Children not allowed',
      Icon: FaChildren,
    },
    {
      title: 'Delivery',
      value: delivery ? 'Delivery service available' : 'No delivery service',
      Icon: GrDeliver,
    },
    {
      title: 'Payment',
      value: paymentOptions.join(', '),
      Icon: IoCard,
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
        <Chip size="sm" className="text-sm" color="primary" radius="sm" variant="flat" startContent={<IoPricetags />}>
          <span className="text-xs font-medium tracking-wider">{priceRange}</span>
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
            <p className="font-bold">Restaurant Details</p>
            <div className="flex flex-wrap items-center gap-2">
              {restaurantDetails.map(({ title, value, Icon }) => (
                <div key={title} className="flex items-center gap-1">
                  <Icon color="text-default" size={16} />
                  <p className="text-xs font-light">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="text-xs font-light">{reservation ? 'Reservation required.' : 'No reservations available'}</p>
            {reservation ? (
              <p className="text-2xl tracking-tighter font-medium">
                {convertPrice(reservation.price, currency)}
                <span className="text-xs tracking-normal"> / Table</span>
              </p>
            ) : null}
            <Link href={paths.adminRestaurant(_id)}>
              <Button color="primary" radius="sm" className="font-medium tracking-wide px-8">
                View Restaurant
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
};

export default RestaurantCard;
