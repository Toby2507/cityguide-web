'use client';

import { RatingCard } from '@/components';
import { useSearchStore } from '@/providers';
import { IRestaurant } from '@/types';
import { numberToCurrency, paths } from '@/utils';
import { Button, Chip, Image } from '@nextui-org/react';
import Link from 'next/link';
import { FaChildren } from 'react-icons/fa6';
import { GrDeliver } from 'react-icons/gr';
import { IoCard, IoPricetags } from 'react-icons/io5';
import { LuVegan } from 'react-icons/lu';
import { MdFoodBank, MdRoomService } from 'react-icons/md';

const SearchRestaurantCard = ({
  _id,
  address,
  avatar,
  locationInfo,
  priceRange,
  rating,
  reviewCount,
  name,
  serviceStyle,
  dietaryProvisions,
  cuisine,
  details: { children, delivery, paymentOptions, reservation },
}: IRestaurant) => {
  const { noOfGuests, reservationCount } = useSearchStore();

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
      title: 'delivery',
      value: delivery ? 'Delivery service available' : 'No delivery service',
      Icon: GrDeliver,
    },
    {
      title: 'payment',
      value: paymentOptions.join(', '),
      Icon: IoCard,
    },
  ];
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
        <Chip size="sm" className="text-sm" color="primary" radius="sm" variant="flat" startContent={<IoPricetags />}>
          <span className="text-xs font-medium tracking-wider">{priceRange}</span>
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
          <div className="border-l border-accentGray2 pl-4 flex gap-6">
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
            <div className="flex flex-col items-end gap-1">
              <p className="text-xs font-light">
                {noOfGuests.adults} adult(s), {noOfGuests.children ? `${noOfGuests.children} child(ren), ` : ''}
                {reservationCount} tables
              </p>
              {reservation ? (
                <p className="text-2xl tracking-tighter font-medium">
                  {numberToCurrency(reservationCount * reservation.price)}
                </p>
              ) : null}
              <Link href={paths.restaurantDetail(_id)}>
                <Button color="primary" radius="sm" size="sm" className="font-medium tracking-wide px-8">
                  View Restaurant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SearchRestaurantCard;
