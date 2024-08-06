'use client';

import { IAddress, LatLng } from '@/types';
import { addressFormatter } from '@/utils';
import { Library } from '@googlemaps/js-api-loader';
import { Input, Textarea } from '@nextui-org/react';
import { useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';

const LIBS: Library[] = ['core', 'maps', 'places', 'marker'];
interface IMap {
  prevAddr: IAddress | null;
  customClass?: string;
  setAddr: (addr: IAddress) => void;
}

const Map = ({ prevAddr, customClass, setAddr }: IMap) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const placesRef = useRef<HTMLInputElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<LatLng>(
    prevAddr?.geoLocation || { lat: 6.515758749836156, lng: 3.389845490455627 }
  );
  const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete | null>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
    libraries: LIBS,
  });

  const handleExtraDetail = (val: string) => {
    if (!prevAddr) return;
    setAddr({ ...prevAddr, extraDetails: val });
  };

  useEffect(() => {
    if (isLoaded) {
      const mapOptions: google.maps.MapOptions = {
        center,
        zoom: 17,
        mapId: 'CITY_GUIDE_MAP',
      };
      setMap(new google.maps.Map(mapRef.current!, mapOptions));
      setAutoComplete(
        new google.maps.places.Autocomplete(placesRef.current!, {
          fields: ['address_components', 'formatted_address', 'geometry', 'name', 'place_id'],
          componentRestrictions: { country: ['ng'] },
        })
      );
    }
  }, [isLoaded, center]);
  useEffect(() => {
    if (map && center) {
      const position = prevAddr?.geoLocation;
      const title = prevAddr?.name || '';
      new google.maps.marker.AdvancedMarkerElement({ map, position, title });
    }
  }, [center, map, prevAddr]);
  useEffect(() => {
    if (autoComplete) {
      const acListen = autoComplete.addListener('place_changed', () => {
        const placeResult = autoComplete.getPlace();
        const formattedPlace = addressFormatter(placeResult);
        setAddr(formattedPlace);
        setCenter(formattedPlace.geoLocation);
      });
      return () => acListen.remove();
    }
  }, [autoComplete, map, setAddr]);
  useEffect(() => {
    if (map) {
      const mapListen = map.addListener('click', (e: google.maps.IconMouseEvent) => {
        if (e?.placeId) {
          e.stop();
          new google.maps.places.PlacesService(map).getDetails(
            { placeId: e.placeId },
            (place: google.maps.places.PlaceResult | null, status: google.maps.places.PlacesServiceStatus) => {
              if (status === 'OK' && place?.geometry?.location) {
                const formattedPlace = addressFormatter(place);
                setAddr(formattedPlace);
                setCenter(formattedPlace.geoLocation);
              }
            }
          );
        }
      });
      return () => mapListen.remove();
    }
  });
  return (
    <div ref={mapRef} className={`flex flex-col gap-4 h-[50vh] w-full ${customClass || ''}`}>
      <Input
        className="bg-white rounded-2xl shadow-2xl focus:outline-none"
        variant="bordered"
        ref={placesRef}
        radius="lg"
      />
      <p className="text-xs text-accentGray2 text-center -mb-2">
        See your property or a familiar spot? Click the icon to set your location!
      </p>
      {isLoaded && <div className="w-full h-full rounded-xl border border-gray-200" ref={mapRef} />}
      {prevAddr && (
        <Textarea
          className="flex-1 h-full"
          label="Extra details"
          minRows={1}
          onValueChange={handleExtraDetail}
          value={prevAddr.extraDetails}
        />
      )}
      <div className="flex flex-wrap items-center justify-center gap-4 px-4 py-2 bg-[#f4f4f5] rounded-xl">
        <div className="flex flex-col items-center">
          <p className="text-sm text-black/60 font-medium">{prevAddr?.name || 'NA'}</p>
          <h6 className="text-accentGray text-xs font-bold">Name</h6>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-black/60 font-medium">{prevAddr?.city || 'NA'}</p>
          <h6 className="text-accentGray text-xs font-bold">City</h6>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-black/60 font-medium">{prevAddr?.state || 'NA'}</p>
          <h6 className="text-accentGray text-xs font-bold">State</h6>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-black/60 font-medium">{prevAddr?.country || 'NA'}</p>
          <h6 className="text-accentGray text-xs font-bold">Country</h6>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-black/60 font-medium">
            {prevAddr?.geoLocation.lat ? `${prevAddr.geoLocation.lat}, ${prevAddr.geoLocation.lng}` : 'NA'}
          </p>
          <h6 className="text-accentGray text-xs font-bold">Geolocation</h6>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-black/60 font-medium">{prevAddr?.fullAddress || 'NA'}</p>
          <h6 className="text-accentGray text-xs font-bold">Full Address</h6>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-black/60 font-medium">{prevAddr?.extraDetails || 'NA'}</p>
          <h6 className="text-accentGray text-xs font-bold">Extra Details</h6>
        </div>
      </div>
    </div>
  );
};

export default Map;
