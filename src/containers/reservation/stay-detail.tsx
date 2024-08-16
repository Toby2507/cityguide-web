'use client';

import { CustomStars } from '@/components';
import { useReservationStore } from '@/providers';
import { IStay } from '@/types';
import { numberToCurrency, paths } from '@/utils';
import { Button, Chip } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import { IoCaretDownOutline, IoCaretUpOutline, IoCheckmark } from 'react-icons/io5';

const StayDetailReservation = ({ type, hotelRating, name, address, rating, accommodation, amenities, _id }: IStay) => {
  const { push } = useRouter();
  const { reservation } = useReservationStore();
  const [showAccs, setShowAccs] = useState<boolean>(false);
  const accommodations =
    reservation?.accommodations
      ?.map((a) => {
        const acc = accommodation.find((acc) => acc.id === a.accommodationId);
        if (acc) return { name: acc.name, quantity: a.reservationCount, unitPrice: acc.price };
        return;
      })
      .filter(Boolean) || [];
  const validAddr =
    address.fullAddress || [address.name, address.city, address.state, address.country].filter(Boolean).join(', ');
  return (
    <section className="flex flex-col gap-2">
      {/* Propery Details */}
      <article className="flex flex-col gap-3 border-2 rounded-xl p-3">
        <div className="flex items-center gap-2">
          <Chip size="sm" className="text-sm" color="primary" radius="sm" variant="flat">
            <span className="text-xs font-medium tracking-wider">{type}</span>
          </Chip>
          {hotelRating && <CustomStars size={16} value={hotelRating} />}
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold tracking-wide">{name}</h3>
          <p className="text-sm font-medium leading-tight">{validAddr}</p>
        </div>
        <div className="flex items-center justify-start gap-2">
          <p className="bg-primary p-2 rounded-es-lg rounded-t-lg text-white text-base">{rating.toFixed(1)}</p>
          <div className="flex flex-col items-start">
            <p className="text-sm text-primary font-bold">Exceptional</p>
            <p className="text-xs text-accentGray font-medium">500 reviews</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {amenities.slice(0, 5).map((name, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <IoCheckmark size={16} />
              <p className="text-xs font-medium">{name}</p>
            </div>
          ))}
        </div>
      </article>
      {/* Reservation Details */}
      <article className="flex flex-col gap-3 border-2 rounded-xl p-3">
        <h3 className="text-lg font-bold tracking-wide">Your booking details</h3>
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium pr-4">Check-in</p>
            <div className="flex flex-col border-r-2 pr-4">
              <p className="text-base font-semibold">Thu, Jun 20, 2024</p>
              <p className="text-xs text-accentGray">From 12:00 AM</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium pl-4">Check-out</p>
            <div className="flex flex-col border-l pl-4">
              <p className="text-base font-semibold">Thu, Jun 23, 2024</p>
              <p className="text-xs text-accentGray">Until 12:00 PM</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <BsExclamationCircle className="text-danger" size={24} />
          <p className="text-sm text-danger font-medium">Just 3 days away</p>
        </div>
        <div className="flex flex-col">
          <p className="text-xs">Total length of stay:</p>
          <p className="text-sm font-semibold">3 nights</p>
        </div>
        <div className="border-b-2 w-full" />
        <div className="flex flex-col">
          <p className="text-sm font-medium">You selected</p>
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-left font-semibold w-full">
              {reservation?.reservationCount} accommodation(s) for {reservation?.noOfGuests?.adults} adult(s)
              {reservation?.noOfGuests?.children ? `and ${reservation.noOfGuests.children} child(ren)` : ''}
            </p>
            <Button onPress={() => setShowAccs(!showAccs)} isIconOnly size="sm" variant="light">
              {showAccs ? <IoCaretDownOutline /> : <IoCaretUpOutline />}
            </Button>
          </div>
          {showAccs && (
            <div className="flex flex-col gap-1">
              {accommodations.map((a) => (
                <p className="text-sm" key={a?.quantity}>
                  {a?.quantity}x {a?.name}
                </p>
              ))}
            </div>
          )}
          <Button
            className="font-semibold text-primary mt-2 w-fit"
            color="secondary"
            onPress={() => push(paths.stayDetail(_id))}
            radius="sm"
            size="sm"
            variant="light"
          >
            Change your selection
          </Button>
        </div>
      </article>
      {/* Price Summary */}
      <article className="flex flex-col gap-3 border-2 rounded-xl pt-3">
        <h3 className="text-lg font-bold tracking-wide px-3">Your price summary</h3>
        <div className="flex flex-col gap-2 px-3">
          {accommodations.map((a) => (
            <div key={a?.name} className="flex items-center justify-between gap-4">
              <p className="text-xs font-medium">{a?.name}</p>
              <p className="text-sm font-semibold">{numberToCurrency((a?.quantity || 0) * (a?.unitPrice || 0))}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between gap-6 bg-bgLightBlue/50 px-3 py-8">
          <p className="text-xl font-bold">Total</p>
          <p className="text-2xl font-bold">{numberToCurrency(reservation?.price || 0)}</p>
        </div>
      </article>
      {/* Cancellation Info */}
      <article className="flex flex-col gap-4 border-2 rounded-xl p-3">
        <h3 className="text-lg font-bold tracking-wide">How much will it cost to cancel?</h3>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between gap-4">
            <p className="text-xs">If you cancel before Thu, Jun 20, 2024, you will pay</p>
            <p className="text-sm font-semibold">{numberToCurrency(0)}</p>
          </div>
          <div className="flex justify-between gap-4">
            <p className="text-xs">If you cancel after Thu, Jun 20, 2024, you will pay</p>
            <p className="text-sm font-semibold">{numberToCurrency(reservation?.price || 0)}</p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default StayDetailReservation;