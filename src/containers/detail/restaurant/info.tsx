'use client';

import { usePriceConversion } from '@/hooks';
import { IRestaurant } from '@/types';
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import dayjs from 'dayjs';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { FaClipboardList } from 'react-icons/fa';
import { GrDeliver } from 'react-icons/gr';
import { IoCard, IoPricetags } from 'react-icons/io5';
import { LuVegan } from 'react-icons/lu';
import { MdFoodBank, MdOutlineFamilyRestroom, MdRoomService } from 'react-icons/md';

interface Props {
  restaurant: IRestaurant;
  onUpdate?: () => void;
}

const RestaurantDetailsInfo = ({
  restaurant: {
    availability,
    cuisine,
    dietaryProvisions,
    priceRange,
    serviceStyle,
    currency,
    cancellationPolicy,
    proxyPaymentEnabled,
    details: { children, delivery, reservation, paymentOptions },
    contact: { email, phone, socialMedia },
  },
  onUpdate,
}: Props) => {
  const { convertPrice } = usePriceConversion();
  return (
    <section className="flex flex-col gap-4 pb-10" id="info">
      <header className="flex items-center justify-between gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold capitalize">Info and Details</h1>
          <p className="flex items-center gap-1 text-sm text-accentGray font-medium">
            Everything you need to know. Plan your visit with our essential information.
          </p>
        </div>
        {onUpdate ? (
          <Button color="primary" className="px-10 font-semibold" onPress={onUpdate} radius="sm">
            Update Restaurant Info
          </Button>
        ) : null}
      </header>
      <div className="grid grid-cols-7 gap-4">
        <div className="col-span-4 flex flex-col gap-4 border border-default rounded-xl p-6">
          <h4 className="text-lg text-black font-semibold">Open Days and Time</h4>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {availability.map((item) => (
              <div className="flex items-center justify-between gap-4" key={item?.day}>
                <p className="text-sm text-accentGray font-semibold">{item?.day}</p>
                <p className="text-xs text-accentGray font-medium">
                  {dayjs(`1-1-1 ${item?.from}`).format('hh:mm A')} - {dayjs(`1-1-1 ${item?.to}`).format('hh:mm A')}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-3 flex flex-col gap-2 border border-default rounded-xl p-6">
          <h4 className="text-lg text-black font-semibold">Contact Us</h4>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-accentGray font-semibold">Email Address</p>
              <p className="text-xs text-accentGray font-medium">{email}</p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-accentGray font-semibold">Phone Number</p>
              <p className="text-xs text-accentGray font-medium">{phone}</p>
            </div>
            {socialMedia?.map(({ name, handle }) => (
              <div className="flex items-center justify-between gap-4" key={name}>
                <p className="text-sm text-accentGray font-semibold">{name}</p>
                <p className="text-xs text-accentGray font-medium">{handle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Table className="border border-default rounded-lg p-4 gap-20" hideHeader removeWrapper aria-label="House rules">
        <TableHeader>
          <TableColumn>Rule</TableColumn>
          <TableColumn>Description</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow className="border-b border-default">
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <IoPricetags className="text-xl" />
              Price Range
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">{priceRange}</TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <MdRoomService className="text-xl" />
              Service Styles
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">
              {serviceStyle?.join(', ') || 'There is no specific service style'}
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <MdFoodBank className="text-xl" />
              Cuisines
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">
              {cuisine?.join(', ') || 'There is no specific cuisine'}
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <LuVegan className="text-xl" />
              Dietary Provisions
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">
              {dietaryProvisions?.join(', ') || 'There is no specific dietary provisions'}
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <FaClipboardList className="text-xl" />
              Reservation
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">
              {reservation
                ? `Reservation required. Fee: ${convertPrice(reservation.price, currency)} per table.`
                : 'No reservations available. Walk-ins welcome.'}
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <BsExclamationCircleFill className="text-lg" />
              Cancellation Policy
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">
              {!reservation
                ? 'This restaurant does not offer a reservation service; therefore, no cancellation policy applies.'
                : cancellationPolicy
                ? `You will receive a full (100%) refund if you cancel more than ${
                    cancellationPolicy.daysFromReservation
                  } days before your reservation date. If you cancel within ${
                    cancellationPolicy.daysFromReservation
                  } days of your reservation date, you will receive a ${
                    cancellationPolicy.percentRefundable * 100
                  }% refund.`
                : `This restaurant does not have a specific cancellation policy. You can cancel your reservation at any time before the reservation date.`}
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <GrDeliver className="text-xl" />
              Delivery Service
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">
              {delivery
                ? 'The restaurant offers a delivery service. Contact the restaurant for more details.'
                : 'The restaurant does not offer a delivery service.'}
            </TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <MdOutlineFamilyRestroom className="text-lg" />
              Children & Infants
            </TableCell>
            <TableCell className="py-4 w-9/12">
              <p className="text-accentGray pb-2">
                Children of all ages are {children ? '' : 'not '}welcome at this property
              </p>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <IoCard className="text-lg" />
              Payment Method
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">
              {!proxyPaymentEnabled ? (
                <>
                  <p className="text-accentGray pb-3">All payment will be made directly at the restaurant.</p>
                  <p className="text-accentGray pb-1">
                    Accepted payment methods include:{' '}
                    <span className="font-semibold uppercase">{paymentOptions.join(', ')}</span>.
                  </p>
                  <p className="text-accentGray">
                    The restaurant&apos;s pricing currency is{' '}
                    <span className="font-semibold uppercase">{currency}</span>.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-accentGray pb-3">
                    We accept payment on behalf of the restaurant for reservations. You will make the payment to us at
                    the time of reservation, and we will transfer it to the restaurant on your behalf. Food, drinks, and
                    additional services will be paid for directly at the restaurant.
                  </p>
                  <p className="text-accentGray pb-1">
                    Accepted payment methods include:{' '}
                    <span className="font-semibold uppercase">{paymentOptions.join(', ')}</span>.
                  </p>
                  <p className="text-accentGray">
                    The property&apos;s pricing currency is <span className="font-semibold uppercase">{currency}</span>.
                  </p>
                </>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
};

export default RestaurantDetailsInfo;
