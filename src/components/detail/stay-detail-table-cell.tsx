'use client';

import { useReservationStore } from '@/providers';
import { IAccommodation } from '@/types';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { IoCheckmark } from 'react-icons/io5';

interface IStayDetailTableBody {
  columnKey: string;
  user: IAccommodation;
}

const StayDetailTableCell = ({ columnKey, user }: IStayDetailTableBody) => {
  const [quantity, setQuantity] = useState<string>('0');
  const { reservations } = useReservationStore();

  const quantities = Array(user.maxGuests)
    .fill(0)
    .map((_, i) => ({ key: (i + 1).toString(), label: (i + 1).toString() }));
  if (columnKey === 'name')
    return (
      <div className="flex flex-col gap-2 max-w-xs">
        <h4 className="text-xl text-black font-semibold">{user.name}</h4>
        <ul className="flex flex-col gap-1">
          {user.rooms.map((room, idx) => (
            <li key={idx}>
              <span className="text-sm font-medium">{room.name}: </span>
              <span className="text-xs">{room.beds.map((bed) => `${bed.count} ${bed.type} bed`).join(', ')}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm">{user?.description}</p>
        {user.amenities ? (
          <>
            <div className="h-[1px] bg-default w-full my-1" />
            <div className="flex flex-wrap items-center gap-2">
              {user.amenities?.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <IoCheckmark color="#0075FF" size={20} />
                  <p className="text-sm font-medium">{amenity}</p>
                </div>
              ))}
            </div>
          </>
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
  if (columnKey === 'price') return <p className="font-semibold">${user.price}</p>;
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
