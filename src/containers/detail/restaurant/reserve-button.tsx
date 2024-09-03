'use client';

import { useReservationStore, useSearchStore } from '@/providers';
import { EntityType, ICreateReservation, IRestaurant, PropertyType } from '@/types';
import { numberToCurrency } from '@/utils';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { GoPeople } from 'react-icons/go';
import { IoPricetagsOutline } from 'react-icons/io5';
import { MdOutlineTableRestaurant } from 'react-icons/md';

interface Props {
  restaurant: IRestaurant;
}

const RestaurantDetailReserveBtn = ({ restaurant }: Props) => {
  const { reservation, setReservation } = useReservationStore();
  const { checkInDay, checkOutDay, noOfGuests, reservationCount } = useSearchStore();
  const { max, available, price } = restaurant.details.reservation!;

  useEffect(() => {
    const reservation: ICreateReservation = {
      property: restaurant._id,
      propertyType: PropertyType.RESTAURANT,
      partner: typeof restaurant.partner === 'string' ? restaurant.partner : restaurant.partner._id,
      partnerType: EntityType.ESTABLISHMENT,
      checkInDay,
      checkInTime: dayjs(checkInDay).format('HH:mm'),
      checkOutDay,
      checkOutTime: dayjs(checkOutDay).format('HH:mm'),
      noOfGuests,
      reservationCount,
    };
    setReservation(reservation);
  }, [checkInDay, checkOutDay, restaurant, noOfGuests, reservationCount, setReservation]);
  return (
    <div className="sticky bottom-10 bg-white border mx-10 rounded-full shadow-2xl z-[9999999999]">
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col gap-1 py-4 px-10 bg-primary rounded-l-full">
          <h4 className="text-white text-base font-semibold tracking-wide">RESERVE A TABLE</h4>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <GoPeople className="text-white" size={20} />
              <p className="text-white text-xs font-light">Max {max}</p>
            </div>
            <div className="flex items-center gap-2">
              <IoPricetagsOutline className="text-white" size={20} />
              <p className="text-white text-xs font-light">{numberToCurrency(price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineTableRestaurant className="text-white" size={20} />
              <p className="text-white text-xs font-light">{available} available</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 py-4 px-10">
          {/* <ButtonGroup className="w-full" size="sm" variant="flat">
            <Button className="text-xs font-medium w-full">
              No of tables: <span className="font-bold">{quantity}</span>
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
          </ButtonGroup> */}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailReserveBtn;
