import { IReservation } from '@/types';
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from '@nextui-org/react';
import dayjs from 'dayjs';
import { HiOutlineDotsVertical } from 'react-icons/hi';

interface IReservationCell {
  columnKey: string;
  reservation: IReservation;
}

const ReservationCell = ({ columnKey, reservation }: IReservationCell) => {
  const guestText = [];
  if (reservation.noOfGuests.adults)
    guestText.push(`${reservation.noOfGuests.adults} Adult${reservation.noOfGuests.adults > 1 ? 's' : ''}`);
  if (reservation.noOfGuests.children)
    guestText.push(`${reservation.noOfGuests.children} Child${reservation.noOfGuests.children > 1 ? 'ren' : ''}`);
  if (columnKey === 'date')
    return <p className="text-xs font-semibold">{dayjs(reservation.createdAt).format('ddd, MMM DD, YYYY')}</p>;
  let statusColor: 'default' | 'secondary' | 'warning' | 'danger' | 'success' | 'primary' | undefined = 'primary';
  if (reservation.status === 'Pending') statusColor = 'warning';
  if (reservation.status === 'Cancelled') statusColor = 'danger';
  if (reservation.status === 'Completed') statusColor = 'success';
  if (columnKey === 'user')
    return (
      <User
        name={`${reservation.user.firstName} ${reservation.user.lastName}`}
        description={reservation.user.email}
        avatarProps={{ src: reservation.user.imgUrl || '', alt: reservation.user.firstName }}
      />
    );
  if (columnKey === 'phone') return <p className="text-xs font-semibold">{reservation.user.phoneNumber}</p>;
  if (columnKey === 'guest') return <p className="text-xs font-semibold">{guestText.join(' x ')}</p>;
  if (columnKey === 'rooms') return <p className="text-xs text-center font-semibold">{reservation.reservationCount}</p>;
  if (columnKey === 'check')
    return (
      <p className="text-xs font-semibold">{`${dayjs(reservation.checkInDay).format('MMM DD, YYYY')} | ${
        reservation.checkInTime
      } - ${dayjs(reservation.checkOutDay).format('MMM DD, YYYY')} | ${reservation.checkOutTime}`}</p>
    );
  if (columnKey === 'status')
    return (
      <Chip color={statusColor} size="sm" variant="flat">
        {reservation.status}
      </Chip>
    );
  if (columnKey === 'action')
    return (
      <div className="relative flex justify-end items-center gap-2">
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light">
              <HiOutlineDotsVertical className="text-accentGray text-xl" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem>View</DropdownItem>
            <DropdownItem>Edit</DropdownItem>
            <DropdownItem>Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
};

export default ReservationCell;
