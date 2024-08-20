import { IRestaurant } from '@/types';
import { numberToCurrency } from '@/utils';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import dayjs from 'dayjs';
import { FaClipboardList } from 'react-icons/fa';
import { GrDeliver } from 'react-icons/gr';
import { IoCard, IoPricetags } from 'react-icons/io5';
import { LuVegan } from 'react-icons/lu';
import { MdFoodBank, MdOutlineFamilyRestroom, MdRoomService } from 'react-icons/md';

const RestaurantDetailsInfo = ({
  availability,
  cuisine,
  dietaryProvisions,
  priceRange,
  serviceStyle,
  details: { children, delivery, reservation, paymentOptions },
  contact: { email, phone, socialMedia },
}: IRestaurant) => {
  return (
    <section className="flex flex-col gap-4 pb-10" id="availability">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold capitalize">Info and Details</h1>
        <p className="flex items-center gap-1 text-sm text-accentGray font-medium">
          Everything you need to know. Plan your visit with our essential information.
        </p>
      </header>
      <div className="grid grid-cols-7 gap-4">
        <div className="col-span-4 flex flex-col gap-4 border border-default rounded-xl p-6">
          <h4 className="text-lg text-black font-semibold">Open Days and Time</h4>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {availability.map(({ day, from, to }) => (
              <div className="flex items-center justify-between gap-4" key={day}>
                <p className="text-sm text-accentGray font-semibold">{day}</p>
                <p className="text-xs text-accentGray font-medium">
                  {dayjs(`1-1-1 ${from}`).format('hh:mm A')} - {dayjs(`1-1-1 ${to}`).format('hh:mm A')}
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
            <TableCell className="py-4 text-accentGray w-9/12">{serviceStyle?.join(', ')}</TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <MdFoodBank className="text-xl" />
              Cuisines
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">{cuisine?.join(', ')}</TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <LuVegan className="text-xl" />
              Dietary Provisions
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">{dietaryProvisions?.join(', ')}</TableCell>
          </TableRow>
          <TableRow className="border-b border-default">
            <TableCell className="flex items-center gap-2 py-4 font-medium">
              <FaClipboardList className="text-xl" />
              Reservation
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">
              {reservation
                ? `Reservation required. Fee: ${numberToCurrency(reservation)} per person.`
                : 'No reservations available. Walk-ins welcome.'}
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
              Accepted Payment method
            </TableCell>
            <TableCell className="py-4 text-accentGray w-9/12">{paymentOptions?.join(', ')}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
};

export default RestaurantDetailsInfo;
