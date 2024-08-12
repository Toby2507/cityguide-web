'use client';

import { useReservationStore } from '@/providers';
import { IAccommodation } from '@/types';
import { numberToCurrency } from '@/utils';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { FaChildren } from 'react-icons/fa6';
import { IoCheckmark, IoFastFoodOutline } from 'react-icons/io5';
import { LuBaby, LuParkingCircle } from 'react-icons/lu';
import { PiBathtub } from 'react-icons/pi';
import { TbMeterSquare } from 'react-icons/tb';

interface IStayDetailTableBody {
  columnKey: string;
  user: IAccommodation;
}

const StayDetailTableCell = ({ columnKey, user }: IStayDetailTableBody) => {
  const [quantity, setQuantity] = useState<string>('0');
  const { reservations } = useReservationStore();

  const accommodationDetails = [
    { title: 'bathrooms', value: `${user.bathrooms} bathrooms`, Icon: PiBathtub },
    { title: 'children', value: user.children ? 'Children allowed' : 'Children not allowed', Icon: FaChildren },
    { title: 'infants', value: user.infants ? 'Infants allowed' : 'Infants not allowed', Icon: LuBaby },
    { title: 'parking', value: `${user.parking} parking`, Icon: LuParkingCircle },
    { title: 'size', value: `${user.size} m²`, Icon: TbMeterSquare },
    {
      title: 'breakfast',
      value: !!user.breakfast
        ? `Very good breakfast ${user.breakfast.price ? numberToCurrency(user.breakfast.price) : 'included'}`
        : 'No breakfast',
      Icon: IoFastFoodOutline,
    },
  ];

  const quantities = Array(user.maxGuests)
    .fill(0)
    .map((_, i) => ({ key: (i + 1).toString(), label: (i + 1).toString() }));
  if (columnKey === 'name')
    return (
      <div className="flex flex-col gap-2">
        <h4 className="text-xl text-black font-semibold">{user.name}</h4>
        <ul className="flex flex-col gap-1">
          {user.rooms.map((room, idx) => (
            <li key={idx}>
              <span className="text-sm font-medium">{room.name}: </span>
              <span className="text-xs">{room.furnitures.map((bed) => `${bed.count} ${bed.type} bed`).join(', ')}</span>
            </li>
          ))}
        </ul>
        <hr />
        <p className="text-sm">{user?.description}</p>
        <hr />
        <div className="flex flex-wrap items-center gap-2">
          {accommodationDetails.map(({ title, value, Icon }) => (
            <div key={title} className="flex items-center gap-1">
              <Icon color="text-default" size={16} />
              <p className="text-xs font-medium">{value}</p>
            </div>
          ))}
        </div>
        {user.amenities ? (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {user.amenities?.map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <IoCheckmark color="text-default" size={16} />
                <p className="text-xs font-medium">{amenity}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  if (columnKey === 'maxGuests')
    return (
      <div className="flex items-center gap-1">
        <FaUserAlt />
        {user.maxGuests < 5 ? (
          Array(user.maxGuests - 1)
            .fill(0)
            .map((_, idx) => <FaUserAlt key={idx} />)
        ) : (
          <p className="text-bold text-sm capitalize">x{user.maxGuests}</p>
        )}
      </div>
    );
  if (columnKey === 'price') return <p className="font-semibold">{numberToCurrency(user.price)}</p>;
  if (columnKey === 'available')
    return (
      <Dropdown>
        <DropdownTrigger>
          <Button className="w-9/12 mx-auto" color="default" variant="bordered" size="sm" radius="lg">
            {quantity}
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="quantity to be booked" items={quantities}>
          {(item) => (
            <DropdownItem key={item.key} onPress={() => setQuantity(item.key)}>
              {item.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    );
  if (columnKey === 'actions')
    return (
      <Button color="primary" className="px-12 font-semibold" radius="full">
        Reserve
      </Button>
    );
  if (!columnKey) return null;
};

export default StayDetailTableCell;
