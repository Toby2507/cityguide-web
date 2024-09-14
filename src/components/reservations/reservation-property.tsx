'use client';

import { INightLife, IReservation, IRestaurant, IStay } from '@/types';
import { formatAddress } from '@/utils';
import { Chip, Image } from '@nextui-org/react';
import RatingCard from '../common/rating-card';

interface Props {
  property: IStay | IRestaurant | INightLife;
  reservation: IReservation;
}

const ReservationProperty = ({ property, reservation }: Props) => {
  const { address, avatar, name, rating, reviewCount, summary } = property;
  const { propertyType } = reservation;
  const type = (property as IStay).type || (property as IRestaurant).priceRange;
  return (
    <article className="grid grid-cols-10 gap-4 border rounded-3xl p-3">
      <figure className="h-full col-span-2 w-full">
        <Image
          src={avatar}
          width="full"
          alt={name}
          radius="none"
          className="w-full object-cover rounded-2xl aspect-square"
        />
      </figure>
      <div className="col-span-8 flex flex-col gap-2">
        <Chip size="sm" className="text-sm" color="primary" radius="sm" variant="flat">
          <span className="text-xs font-medium tracking-wider">{type}</span>
        </Chip>
        <header className="flex justify-between gap-10 w-full">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-semibold tracking-wide">{name}</h3>
            <p className="text-xs text-accentGray underline">{formatAddress(address)}</p>
          </div>
          <RatingCard rating={rating} reviewCount={reviewCount} size="sm" />
        </header>
        <p className="text-sm">{summary.split('\n')[0]}</p>
      </div>
    </article>
  );
};

export default ReservationProperty;
