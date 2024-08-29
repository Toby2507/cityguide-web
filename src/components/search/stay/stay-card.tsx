'use client';

import CustomStars from '@/components/common/custom-stars';
import RatingCard from '@/components/common/rating-card';
import { useSearchStore } from '@/providers';
import { IStay } from '@/types';
import { formatAccomodationDetails, numberToCurrency, paths } from '@/utils';
import { Button, Chip, Image, Link } from '@nextui-org/react';
import dayjs from 'dayjs';
import { BsDot } from 'react-icons/bs';

const SearchStayCard = ({
  _id,
  avatar,
  accommodation,
  address,
  name,
  type,
  rating,
  reviewCount,
  hotelRating,
  locationInfo,
}: IStay) => {
  const { noOfGuests, reservationCount, checkInDay, checkOutDay } = useSearchStore();

  const nights = checkInDay && checkOutDay ? dayjs(checkOutDay).diff(dayjs(checkInDay), 'd') : 1;
  const guests = noOfGuests.adults + noOfGuests.children;
  const validAddr =
    address.fullAddress || [address.name, address.city, address.state, address.country].filter(Boolean).join(', ');
  const acc = accommodation.filter(
    (a) =>
      reservationCount <= a.available &&
      noOfGuests.adults + noOfGuests.children <= a.maxGuests &&
      !(noOfGuests.children && !a.children && !a.infants)
  );

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
              <div className="flex items-center gap-4">
                <h3 className="text-xl text-primary font-semibold tracking-wide">{name}</h3>
                {hotelRating && <CustomStars value={hotelRating} />}
              </div>
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
            <div className="flex-1 flex flex-col gap-3">
              <p className="font-bold">{accommodation[0].name}</p>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {formatAccomodationDetails(acc[0]).map(({ title, value, Icon }) => (
                  <div key={title} className="flex items-center gap-1">
                    <Icon color="text-default" size={16} />
                    <p className="text-xs font-light">{value}</p>
                  </div>
                ))}
              </div>
              {acc[0].available <= 5 ? (
                <div className="flex gap-2">
                  <BsDot className="text-danger" size={16} />
                  <p className="flex-1 text-xs text-danger font-medium">Only {acc[0].available} left on our site</p>
                </div>
              ) : null}
            </div>
            <div className="flex flex-col items-end gap-1">
              <p className="text-xs font-light">
                {nights} night, {guests} guests
              </p>
              <p className="text-2xl tracking-tighter font-medium">{numberToCurrency(nights * acc[0].price)}</p>
              <Link href={paths.stayDetail(_id)}>
                <Button color="primary" radius="sm" size="sm" className="font-medium tracking-wide px-8">
                  View Stay
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SearchStayCard;
