'use client';

import { useSearchStore } from '@/providers';
import { addressFormatter } from '@/utils';
import { Library } from '@googlemaps/js-api-loader';
import { CalendarDate, getLocalTimeZone, parseDate, today } from '@internationalized/date';
import { Button, DateRangePicker, Input, Popover, PopoverContent, PopoverTrigger, RangeValue } from '@nextui-org/react';
import { useJsApiLoader } from '@react-google-maps/api';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineLocationSearching } from 'react-icons/md';
import { PiMinusThin, PiPlusThin } from 'react-icons/pi';

interface Props {
  noLocation?: boolean;
}

const LIBS: Library[] = ['places', 'core'];
const StaySearchBar = ({ noLocation }: Props) => {
  const { setState, checkInDay, checkOutDay, location, noOfGuests, reservationCount } = useSearchStore();
  const placesRef = useRef<HTMLInputElement>(null);
  const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete | null>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
    libraries: LIBS,
  });
  const validCheckIn = dayjs(checkInDay).isValid() ? dayjs(checkInDay) : dayjs();
  const validCheckOut = dayjs(checkOutDay).isValid() ? dayjs(checkOutDay) : dayjs().add(1, 'd');
  const checkDate = {
    start: parseDate(validCheckIn.format('YYYY-MM-DD')),
    end: parseDate(validCheckOut.format('YYYY-MM-DD')),
  };

  const setCheckDate = (value: RangeValue<CalendarDate>) =>
    setState({
      checkInDay: value.start.toString(),
      checkOutDay: value.end.toString(),
    });

  useEffect(() => {
    if (isLoaded && !noLocation) {
      setAutoComplete(
        new google.maps.places.Autocomplete(placesRef.current!, {
          fields: ['address_components', 'formatted_address', 'geometry', 'name', 'place_id'],
          componentRestrictions: { country: ['ng'] },
        })
      );
    }
  }, [isLoaded, noLocation]);
  useEffect(() => {
    if (autoComplete && !noLocation) {
      const acListen = autoComplete.addListener('place_changed', () => {
        const placeResult = autoComplete.getPlace();
        const location = addressFormatter(placeResult);
        setState({ location });
      });
      return () => acListen.remove();
    }
  }, [autoComplete, noLocation, setState]);
  return (
    <div className="relative flex items-center gap-1 bg-accentLightBlue p-1 rounded-xl shadow-xl -mt-9 mx-auto w-full">
      {!noLocation ? (
        <Input
          className="flex-1 h-full"
          label="Set destination"
          startContent={<MdOutlineLocationSearching />}
          size="sm"
          radius="sm"
          placeholder={location?.fullAddress || ''}
          ref={placesRef}
        />
      ) : null}
      <DateRangePicker
        className="flex-1"
        label="Set check in/check out date"
        radius="sm"
        size="sm"
        visibleMonths={2}
        onChange={setCheckDate}
        value={checkDate}
        minValue={today(getLocalTimeZone())}
      />
      <div className="flex-1 py-[6px] bg-[#F4F4F4] rounded-lg w-full hover:bg-[#E4E4E4]">
        <Popover className="flex-1" placement="bottom-end" radius="sm">
          <PopoverTrigger className="flex-1 px-3 w-full">
            <div className="flex flex-col cursor-pointer w-full">
              <p className="text-xs text-accentGray2 font-semibold">Reservation info</p>
              <div className="flex items-center gap-2">
                <FaRegUser />
                <p className="text-sm">
                  {`${noOfGuests.adults} adult${noOfGuests.adults === 1 ? '' : 's'} • ${noOfGuests.children} child${
                    noOfGuests.children === 1 ? '' : 'ren'
                  } • ${reservationCount} accommodation${reservationCount === 1 ? '' : 's'}`}
                </p>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="mt-2 w-96">
            <div className="flex flex-col gap-1 p-6 w-full">
              <div className="flex items-center justify-between gap-12">
                <p className="text-sm">Adults</p>
                <div className="flex items-center rounded-sm border border-black/60">
                  <Button
                    color="primary"
                    isDisabled={noOfGuests.adults <= 1}
                    isIconOnly
                    onPress={() => setState({ noOfGuests: { ...noOfGuests, adults: noOfGuests.adults - 1 } })}
                    radius="sm"
                    variant="light"
                  >
                    <PiMinusThin size={20} />
                  </Button>
                  <p className="text-sm text-center font-medium w-10">{noOfGuests.adults}</p>
                  <Button
                    color="primary"
                    isIconOnly
                    onPress={() => setState({ noOfGuests: { ...noOfGuests, adults: noOfGuests.adults + 1 } })}
                    radius="sm"
                    variant="light"
                  >
                    <PiPlusThin size={20} />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between gap-12">
                <p className="text-sm">Children</p>
                <div className="flex items-center rounded-sm border border-black/60">
                  <Button
                    color="primary"
                    isDisabled={noOfGuests.children <= 0}
                    isIconOnly
                    onPress={() => setState({ noOfGuests: { ...noOfGuests, children: noOfGuests.children - 1 } })}
                    radius="sm"
                    variant="light"
                  >
                    <PiMinusThin size={20} />
                  </Button>
                  <p className="text-sm text-center font-medium w-10">{noOfGuests.children}</p>
                  <Button
                    color="primary"
                    isIconOnly
                    onPress={() => setState({ noOfGuests: { ...noOfGuests, children: noOfGuests.children + 1 } })}
                    radius="sm"
                    variant="light"
                  >
                    <PiPlusThin size={20} />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between gap-12">
                <p className="text-sm">Accommodations</p>
                <div className="flex items-center rounded-sm border border-black/60">
                  <Button
                    color="primary"
                    isDisabled={reservationCount <= 1}
                    isIconOnly
                    onPress={() => setState({ reservationCount: reservationCount - 1 })}
                    radius="sm"
                    variant="light"
                  >
                    <PiMinusThin size={20} />
                  </Button>
                  <p className="text-sm text-center font-medium w-10">{reservationCount}</p>
                  <Button
                    color="primary"
                    isIconOnly
                    onPress={() => setState({ reservationCount: reservationCount + 1 })}
                    radius="sm"
                    variant="light"
                  >
                    <PiPlusThin size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Button className="font-semibold" size="lg" color="primary" radius="sm">
        Search
      </Button>
    </div>
  );
};

export default StaySearchBar;
