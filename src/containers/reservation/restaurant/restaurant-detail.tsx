'use client';

import { RatingCard } from '@/components';
import { usePriceConversion } from '@/hooks';
import { useReservationStore } from '@/providers';
import { IRestaurant } from '@/types';
import { formatAddress, paths } from '@/utils';
import { Button, Chip } from '@nextui-org/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import { BsExclamationCircle } from 'react-icons/bs';
import { FaChildren } from 'react-icons/fa6';
import { GrDeliver } from 'react-icons/gr';
import { IoCard, IoCheckmark, IoPricetags } from 'react-icons/io5';
import { LuVegan } from 'react-icons/lu';
import { MdFoodBank, MdRoomService } from 'react-icons/md';
import { PiCheckCircleFill } from 'react-icons/pi';

interface Props extends IRestaurant {
  onlyInfo?: boolean;
}

dayjs.extend(relativeTime);
const RestaurantDetailReservation = ({
  _id,
  address,
  name,
  priceRange,
  rating,
  reviewCount,
  serviceStyle,
  dietaryProvisions,
  cuisine,
  cancellationPolicy,
  currency,
  onlyInfo,
  details: { amenities, children, delivery, paymentOptions },
}: Props) => {
  const { convertPrice } = usePriceConversion();
  const { reservation } = useReservationStore();
  const validAddr = formatAddress(address);
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
  const cancellationDeadline =
    cancellationPolicy && dayjs(reservation?.checkInDay).subtract(cancellationPolicy.daysFromReservation, 'd');
  return (
    <section className="flex flex-col gap-2">
      {/* Propery Details */}
      <article className="flex flex-col gap-3 border-2 rounded-xl p-3">
        <div className="flex items-center justify-between gap-2">
          <Chip size="sm" className="text-sm" color="primary" radius="sm" variant="flat" startContent={<IoPricetags />}>
            <span className="text-xs font-medium tracking-wider">{priceRange}</span>
          </Chip>
          <RatingCard rating={rating} reviewCount={reviewCount} size="sm" reversed />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold tracking-wide">{name}</h3>
          <p className="text-sm font-medium leading-tight">{validAddr}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {amenities.slice(0, 5).map((name, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <IoCheckmark size={16} />
              <p className="text-xs font-medium">{name}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {restaurantDetails.map(({ title, value, Icon }) => (
            <div key={title} className="flex items-center gap-1">
              <Icon color="text-default" size={16} />
              <p className="text-xs font-light">{value}</p>
            </div>
          ))}
        </div>
      </article>
      {/* Reservation Details */}
      <article className="flex flex-col gap-3 border-2 rounded-xl p-3">
        <h3 className="text-lg font-bold tracking-wide">Your booking details</h3>
        <div className="flex flex-col">
          <p className="text-xs font-medium pr-3">Reservation date: </p>
          <div className="flex flex-col">
            <p className="text-base font-semibold">{dayjs(reservation?.checkInDay).format('ddd, MMM DD, YYYY')}</p>
            <p className="text-xs text-accentGray">
              From {dayjs(`2000-01-01 ${reservation?.checkInTime}`).format('hh:mm A')} Until{' '}
              {dayjs(`2000-01-01 ${reservation?.checkOutTime}`).format('hh:mm A')}
            </p>
          </div>
        </div>
        {dayjs(`${dayjs(reservation?.checkInDay).format('YYYY-MM-DD')} ${reservation?.checkInTime}`).diff(
          dayjs(),
          'd'
        ) <= 3 ? (
          <div className="flex items-center gap-2">
            <BsExclamationCircle className="text-danger" size={18} />
            <p className="text-xs text-danger font-medium">
              Just{' '}
              {dayjs(`${dayjs(reservation?.checkInDay).format('YYYY-MM-DD')} ${reservation?.checkInTime}`).fromNow(
                true
              )}{' '}
              away
            </p>
          </div>
        ) : null}
        {!onlyInfo && (
          <>
            <div className="border-b-2 w-full" />
            <div className="flex flex-col">
              <p className="text-xs font-medium">You selected</p>
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-left font-semibold w-full">
                  {reservation?.reservationCount} tables(s) for {reservation?.noOfGuests?.adults} adult(s)
                  {reservation?.noOfGuests?.children ? `and ${reservation.noOfGuests.children} child(ren)` : ''}
                </p>
              </div>
              <Link href={paths.restaurantDetail(_id)}>
                <Button
                  className="font-semibold text-primary mt-2 w-fit"
                  color="secondary"
                  radius="sm"
                  size="sm"
                  variant="light"
                >
                  Change your selection
                </Button>
              </Link>
            </div>
          </>
        )}
      </article>
      {/* Price Summary */}
      <article className="flex flex-col gap-3 border-2 rounded-xl pt-3">
        <h3 className="text-lg font-bold tracking-wide px-3">Your price summary</h3>
        <div className="flex items-center justify-between gap-6 bg-bgLightBlue/50 px-3 py-8">
          <p className="text-xl font-bold">Total</p>
          <p className="text-2xl font-bold">{convertPrice(reservation?.price || 0, currency)}</p>
        </div>
      </article>
      {/* Cancellation Info */}
      <article className="flex flex-col gap-4 border-2 rounded-xl p-3">
        <h3 className="text-lg font-bold tracking-wide">How much will it cost to cancel?</h3>
        <div className="flex flex-col gap-1">
          {cancellationPolicy ? (
            <div className="flex flex-col gap-2">
              {cancellationDeadline?.isBefore(dayjs(), 'd') ? null : cancellationDeadline?.isSame(dayjs(), 'd') ? (
                <div className="flex items-center gap-2">
                  <PiCheckCircleFill className="text-green-600" size={20} />
                  <p className="text-xs text-green-600">Free cancellation till the end of the day today</p>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <PiCheckCircleFill className="text-green-600" size={20} />
                  <p className="text-xs text-green-600">
                    Free cancellation till the end of the day {cancellationDeadline?.format('ddd, MMM DD, YYYY')}
                  </p>
                </div>
              )}
              <div className="flex justify-between gap-4">
                <p className="text-xs">
                  If you cancel
                  {dayjs(reservation?.checkInDay).diff(dayjs(), 'd') >= cancellationPolicy.daysFromReservation
                    ? ` after ${cancellationDeadline?.format('ddd, MMM DD, YYYY')}`
                    : ''}
                  , you will pay
                </p>
                <p className="text-sm font-semibold">
                  {convertPrice((reservation?.price || 0) * (1 - cancellationPolicy.percentRefundable), currency)}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-green-600">Free cancellation at any time</p>
          )}
        </div>
      </article>
    </section>
  );
};

export default RestaurantDetailReservation;
