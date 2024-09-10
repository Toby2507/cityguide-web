import { IPartner, IReservation } from '@/types';
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from '@nextui-org/react';
import dayjs from 'dayjs';
import { HiOutlineDotsVertical } from 'react-icons/hi';

interface IReservationCell {
  columnKey: string;
  reservation: IReservation;
}

const ReservationCell = ({ columnKey, reservation }: IReservationCell) => {
  const guestText = [];
  const user = reservation.user as IPartner;
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
        name={`${user.firstName} ${user.lastName}`}
        description={user.email}
        avatarProps={{ src: user.imgUrl || '', alt: user.firstName }}
      />
    );
  if (columnKey === 'phone') return <p className="text-xs font-semibold">{user.phoneNumber}</p>;
  if (columnKey === 'guest') return <p className="text-xs font-semibold">{guestText.join(' x ')}</p>;
  if (columnKey === 'rooms') return <p className="text-xs text-center font-semibold">{reservation.reservationCount}</p>;
  if (columnKey === 'check')
    return (
      <p className="text-xs font-semibold">{`${dayjs(reservation.checkInDay).format('MMM DD, YYYY')} | ${dayjs(
        `2000-01-01 ${reservation.checkInTime}`
      ).format('hh:mm A')} - ${dayjs(reservation.checkOutDay).format('MMM DD, YYYY')} | ${dayjs(
        `2000-01-01 ${reservation.checkOutTime}`
      ).format('hh:mm A')}`}</p>
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
