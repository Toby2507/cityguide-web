'use client';

import { useReservationStore, useSearchStore } from '@/providers';
import { EntityType, ICreateReservation, IGuests, IRestaurant, PropertyType } from '@/types';
import { numberToCurrency } from '@/utils';
import { Button, ButtonGroup, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { GoPeople } from 'react-icons/go';
import { IoCaretDownOutline, IoPricetagsOutline } from 'react-icons/io5';
import { MdOutlineTableRestaurant } from 'react-icons/md';

interface Props {
  restaurant: IRestaurant;
}

const RestaurantDetailReserveBtn = ({ restaurant }: Props) => {
  const { reservation, setReservation } = useReservationStore();
  const { checkInDay, checkOutDay, noOfGuests, reservationCount } = useSearchStore();
  const { max, available, price } = restaurant.details.reservation!;

  const quantities = Array(available + 1)
    .fill(0)
    .map((_, i) => ({ key: i.toString(), label: i ? `${i} (${numberToCurrency(i * price)})` : i.toString() }));
  const adultList = Array(max - noOfGuests.children)
    .fill(0)
    .map((_, i) => ({ key: (i + 1).toString(), label: (i + 1).toString() }));
  const childrenList = Array(max + 1 - noOfGuests.adults)
    .fill(0)
    .map((_, i) => ({ key: i.toString(), label: i.toString() }));

  const changeNoOfGuests = ({ adults, children }: Partial<IGuests>) => {
    setReservation({
      noOfGuests: {
        adults: adults || reservation?.noOfGuests?.adults!,
        children: children !== undefined ? children : reservation?.noOfGuests?.children!,
      },
    });
  };

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
    <div className="sticky bottom-10 bg-white border mx-10 rounded-full shadow-2xl z-[9999]">
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
        <div className="col-span-2 flex items-center gap-4 py-4 px-10">
          <ButtonGroup className="w-full" size="sm" variant="flat">
            <Button className="text-xs font-medium w-full">
              No of tables: <span className="font-bold">{reservation?.reservationCount}</span>
            </Button>
            <Dropdown
              classNames={{ content: '!max-h-96 !justify-start overflow-auto z-[99999]' }}
              placement="bottom-end"
            >
              <DropdownTrigger>
                <Button isIconOnly>
                  <IoCaretDownOutline />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="quantity to be booked" items={quantities}>
                {(item) => (
                  <DropdownItem key={item.key} onPress={() => setReservation({ reservationCount: +item.key })}>
                    {item.label}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </ButtonGroup>
          {reservation?.reservationCount ? (
            <>
              <ButtonGroup className="w-full" size="sm" variant="flat">
                <Button className="text-xs font-medium w-full">
                  Adult guests: <span className="font-bold">{reservation?.noOfGuests?.adults}</span>
                </Button>
                <Dropdown
                  classNames={{ content: '!max-h-96 !justify-start overflow-auto z-[99999]' }}
                  placement="bottom-end"
                >
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
              {restaurant.details.children ? (
                <ButtonGroup className="w-full" size="sm" variant="flat">
                  <Button className="text-xs font-medium w-full">
                    Child guests: <span className="font-bold">{reservation?.noOfGuests?.children}</span>
                  </Button>
                  <Dropdown
                    classNames={{ content: '!max-h-96 !justify-start overflow-auto z-[99999]' }}
                    placement="bottom-end"
                  >
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
          <Button
            isDisabled={!reservation?.reservationCount}
            color="primary"
            className="px-12 font-semibold"
            radius="full"
            // onPress={() => push(paths.reserveStay(reservation?.property!))}
          >
            Reserve
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailReserveBtn;
