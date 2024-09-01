'use client';

import { LIBS } from '@/data';
import { useSearchStore } from '@/providers';
import { addressFormatter, paths } from '@/utils';
import { getLocalTimeZone, parseAbsoluteToLocal, today, ZonedDateTime } from '@internationalized/date';
import { Button, DatePicker, Input, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { useJsApiLoader } from '@react-google-maps/api';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineLocationSearching } from 'react-icons/md';
import { PiMinusThin, PiPlusThin } from 'react-icons/pi';

interface Props {
  noLocation?: boolean;
  extraClass?: string;
  search?: Function;
  isMain?: boolean;
}

const RestaurantSearchBar = ({ extraClass, isMain, noLocation, search }: Props) => {
  const { push } = useRouter();
  const { setState, checkInDay, location, noOfGuests, reservationCount } = useSearchStore();
  const placesRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [renderSearch, setRenderSearch] = useState<boolean>(false);
  const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete | null>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
    libraries: LIBS,
  });
  const validCheckIn = dayjs(checkInDay).isValid() ? dayjs(checkInDay).toISOString() : dayjs().toISOString();
  const resDate = parseAbsoluteToLocal(validCheckIn);

  const setCheckDate = (value: ZonedDateTime) => {
    setState({
      checkInDay: dayjs(value.toDate()).toISOString(),
      checkOutDay: dayjs(value.add({ hours: 1 }).toDate()).toISOString(),
    });
  };
  const clearLocation = () => setState({ location: null });
  const handleSearch = () => {
    setIsLoading(true);
    if (isMain) location ? push(paths.searchRestaurant()) : toast.error('Please select a location');
    else search!();
    setIsLoading(false);
  };

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
  useEffect(() => {
    setRenderSearch(true);
    if (!dayjs(checkInDay).isValid()) setState({ checkInDay: dayjs().toISOString() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {renderSearch ? (
        <div className={`relative flex items-center gap-1 bg-accentLightBlue p-1 rounded-xl shadow-xl ${extraClass}`}>
          {!noLocation ? (
            <Input
              className="flex-1 h-full"
              label="Set destination"
              startContent={<MdOutlineLocationSearching />}
              size="sm"
              radius="sm"
              placeholder={location?.fullAddress || ''}
              ref={placesRef}
              isClearable
              onClear={clearLocation}
            />
          ) : null}
          <DatePicker
            className="flex-1"
            label="Set reservation date"
            radius="sm"
            size="sm"
            onChange={setCheckDate}
            hideTimeZone
            value={resDate}
            minValue={today(getLocalTimeZone())}
            suppressHydrationWarning
          />
          <div className="flex-1 py-[6px] bg-[#F4F4F4] rounded-lg w-full hover:bg-[#E4E4E4]">
            <Popover className="flex-1" placement="bottom-end" radius="sm" triggerScaleOnOpen={false}>
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
          {!!search || isMain ? (
            <Button
              className="font-semibold"
              size="lg"
              color="primary"
              isLoading={isLoading}
              onPress={handleSearch}
              radius="sm"
            >
              Search
            </Button>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default RestaurantSearchBar;