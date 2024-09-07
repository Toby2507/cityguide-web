'use client';

import { LIBS } from '@/data';
import { useSearchStore } from '@/providers';
import { addressFormatter, paths } from '@/utils';
import { getLocalTimeZone, parseAbsoluteToLocal, today, ZonedDateTime } from '@internationalized/date';
import { Button, DatePicker, Input } from '@nextui-org/react';
import { useJsApiLoader } from '@react-google-maps/api';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { MdOutlineLocationSearching } from 'react-icons/md';
import { PiCalendarDots } from 'react-icons/pi';

interface Props {
  noLocation?: boolean;
  extraClass?: string;
  search?: Function;
  isMain?: boolean;
}

const NightlifeSearchBar = ({ extraClass, isMain, noLocation, search }: Props) => {
  const { push } = useRouter();
  const { setState, checkInDay, location, minAge, activeTab } = useSearchStore();
  const placesRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    if (isMain) location ? push(paths.searchNightlife()) : toast.error('Please select a location');
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
    if (activeTab !== 'Nightlife' && isMain) push(`/${activeTab.toLowerCase()}`);
  }, [activeTab, isMain, push]);
  useEffect(() => {
    if (!dayjs(checkInDay).isValid()) {
      const newDate = dayjs().isBefore(dayjs(checkInDay)) ? dayjs(checkInDay).toISOString() : dayjs().toISOString();
      setState({ checkInDay: newDate });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
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
        <Input
          className="flex-1 h-full"
          label="Minimum age in group"
          startContent={<PiCalendarDots />}
          size="sm"
          radius="sm"
          value={minAge?.toString() || '0'}
          onValueChange={(val) => /^[\d.]*$/.test(val) && setState({ minAge: +val })}
        />
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
    </>
  );
};

export default NightlifeSearchBar;
