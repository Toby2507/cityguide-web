'use client';

import { useReservationStore } from '@/providers';
import { IAccommodation, ICancellation, IGuests, StayType } from '@/types';
import { formatAccomodationDetails, numberToCurrency, paths } from '@/utils';
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { BsDot } from 'react-icons/bs';
import { FaUserAlt } from 'react-icons/fa';
import { IoCaretDownOutline, IoCheckmark } from 'react-icons/io5';
import React from 'react';
import ImageModal from '../common/image-modal';

interface Props {
  columnKey: string;
  user: IAccommodation;
  showAction: boolean;
  type: StayType;
  isAdmin?: boolean;
  cancellationPolicy: ICancellation | null;
}
const GUEST: IGuests = { adults: 1, children: 0 };

const StayDetailTableCell = ({ columnKey, user, showAction, type, isAdmin, cancellationPolicy }: Props) => {
  const { push } = useRouter();
  const { reservation, updateAccommodations } = useReservationStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const quantity = useMemo(
    () => reservation?.accommodations?.find((a) => a.accommodationId === user.id)?.reservationCount || 0,
    [reservation, user.id]
  );
  const noOfGuests = useMemo(
    () => reservation?.accommodations?.find((a) => a.accommodationId === user.id)?.noOfGuests || GUEST,
    [reservation, user.id]
  );
  const prepayment = [StayType.APARTMENT, StayType.BnB].includes(type);

  const reservationInfo = [
    { id: 'cancellation', title: 'Free Cancellation', description: '' },
    ...(!prepayment
      ? [
          { id: 'confirmation', title: 'Confirmation is immediate', description: '' },
          { id: 'prepayment', title: 'No Prepayment needed', description: 'pay at the property' },
        ]
      : []),
  ];
  const quantities = Array(user.available + 1)
    .fill(0)
    .map((_, i) => ({ key: i.toString(), label: i ? `${i} (${numberToCurrency(i * user.price)})` : i.toString() }));
  const adultList = Array(user.maxGuests - noOfGuests.children)
    .fill(0)
    .map((_, i) => ({ key: (i + 1).toString(), label: (i + 1).toString() }));
  const childrenList = Array(user.maxGuests + 1 - noOfGuests.adults)
    .fill(0)
    .map((_, i) => ({ key: i.toString(), label: i.toString() }));

  const changeQuantity = (reservationCount: number) => {
    updateAccommodations({ accommodationId: user.id, reservationCount, noOfGuests }, user.price);
  };
  const changeNoOfGuests = ({ adults, children }: Partial<IGuests>) => {
    updateAccommodations({
      accommodationId: user.id,
      reservationCount: quantity,
      noOfGuests: {
        adults: adults || noOfGuests.adults,
        children: children !== undefined ? children : noOfGuests.children,
      },
    });
  };
  if (columnKey === 'name')
    return (
      <>
        <ImageModal
          isOpen={isOpen}
          name={user.name}
          images={user.images.slice(1)}
          avatar={user.images[0]}
          onOpenChange={onOpenChange}
          noBook
        />
        <div className="flex flex-col gap-2">
          <h4 className="text-xl text-black font-semibold cursor-pointer hover:underline" onClick={onOpen}>
            {user.name}
          </h4>
          <ul className="flex flex-col gap-1">
            {user.rooms.map((room, idx) => (
              <li key={idx}>
                <span className="text-sm font-medium">{room.name}: </span>
                <span className="text-xs">{room.furnitures.map((bed) => `${bed.count} ${bed.type}`).join(', ')}</span>
              </li>
            ))}
          </ul>
          <hr />
          <p className="text-sm">{user?.description}</p>
          <hr />
          <div className="flex flex-wrap items-center gap-2">
            {formatAccomodationDetails(user).map(({ title, value, Icon }) => (
              <div key={title} className="flex items-center gap-1">
                <Icon size={16} />
                <p className="text-xs font-medium">{value}</p>
              </div>
            ))}
          </div>
          {user.amenities ? (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {user.amenities?.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <IoCheckmark size={16} />
                  <p className="text-xs font-medium">{amenity}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </>
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
  if (columnKey === 'options')
    return (
      <div className="flex flex-col gap-1 w-40">
        {!isAdmin ? (
          <>
            <ButtonGroup className="w-full" size="sm" variant="flat">
              <Button className="text-xs font-medium w-full">
                No of rooms: <span className="font-bold">{quantity}</span>
              </Button>
              <Dropdown classNames={{ content: '!max-h-96 !justify-start overflow-auto' }} placement="bottom-end">
                <DropdownTrigger>
                  <Button isIconOnly>
                    <IoCaretDownOutline />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="quantity to be booked" items={quantities}>
                  {(item) => (
                    <DropdownItem key={item.key} onPress={() => changeQuantity(+item.key)}>
                      {item.label}
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </ButtonGroup>
            {quantity ? (
              <>
                <p className="text-xs font-medium pl-2 pt-1">Per Room</p>
                <ButtonGroup className="w-full" size="sm" variant="flat">
                  <Button className="text-xs font-medium w-full">
                    Adult guests: <span className="font-bold">{noOfGuests.adults}</span>
                  </Button>
                  <Dropdown classNames={{ content: '!max-h-96 !justify-start overflow-auto' }} placement="bottom-end">
                    <DropdownTrigger>
                      <Button isIconOnly>
                        <IoCaretDownOutline />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="quantity to be booked" items={adultList}>
                      {(item) => (
                        <DropdownItem key={item.key} onPress={() => changeNoOfGuests({ adults: +item.key })}>
                          {item.label}
                        </DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                {user.children || user.infants ? (
                  <ButtonGroup className="w-full" size="sm" variant="flat">
                    <Button className="text-xs font-medium w-full">
                      Child guests: <span className="font-bold">{noOfGuests.children}</span>
                    </Button>
                    <Dropdown classNames={{ content: '!max-h-96 !justify-start overflow-auto' }} placement="bottom-end">
                      <DropdownTrigger>
                        <Button isIconOnly>
                          <IoCaretDownOutline />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="quantity to be booked" items={childrenList}>
                        {(item) => (
                          <DropdownItem key={item.key} onPress={() => changeNoOfGuests({ children: +item.key })}>
                            {item.label}
                          </DropdownItem>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  </ButtonGroup>
                ) : null}
              </>
            ) : null}
            {user.available <= 5 ? (
              <div className="flex gap-2 pt-6">
                <BsDot className="text-danger" size={16} />
                <p className="flex-1 text-xs text-danger font-medium">Only {user.available} left on our site</p>
              </div>
            ) : null}
          </>
        ) : (
          <div className="flex gap-1">
            <BsDot size={16} />
            <p className="flex-1 text-xs font-medium">
              {!user.available ? 'None' : user.available} of this accommodation is available
            </p>
          </div>
        )}
      </div>
    );
  if (columnKey === 'actions' && showAction)
    return (
      <div className="flex flex-col gap-6 w-48">
        {reservation?.reservationCount ? (
          <div className="flex flex-col">
            <p className="text-sm">
              <span className="font-bold">{reservation.reservationCount}</span> accommodation(s) for
            </p>
            <p className="text-2xl font-semibold">{numberToCurrency(reservation.price || 0)}</p>
          </div>
        ) : null}
        <div className="flex flex-col gap-1">
          {!isAdmin ? (
            <Button
              isDisabled={!reservation?.reservationCount}
              color="primary"
              className="px-12 font-semibold"
              radius="sm"
              onPress={() => push(paths.reserveStay(reservation?.property!))}
            >
              Reserve
            </Button>
          ) : null}
          {reservation?.reservationCount ? <p className="text-xs">Continue reservation at the next step</p> : null}
        </div>
        <ul className="flex flex-col gap-2">
          {reservationInfo.map(({ id, title, description }) => (
            <li key={id} className="flex gap-2">
              <IoCheckmark size={16} />
              <p className="flex-1 text-xs font-medium">
                <span className="font-semibold">{title}</span>
                {description ? <span className="font-light"> - {description}</span> : null}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  if (!columnKey) return null;
};

export default StayDetailTableCell;
