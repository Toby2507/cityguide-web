'use client';

import { IAddress, LatLng } from '@/types';
import { addressFormatter } from '@/utils';
import { Library } from '@googlemaps/js-api-loader';
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
} from '@nextui-org/react';
import { useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';

const LIBS: Library[] = ['core', 'maps', 'places', 'marker'];
const buildMapInfoCard = (title: string, body: string) => {
  return `<div className="map_infocard__body">
      <h1 className="map_infocard__title">${title}</h1>
      <p className="map_infocard__content">${body}</p>
    </div>`;
};
interface IMap {
  center: LatLng;
  prevAddr: IAddress | null;
  setAddr: (addr: IAddress) => void;
}

const Map = ({ center, prevAddr, setAddr }: IMap) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const placesRef = useRef<HTMLInputElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [address, setAddress] = useState<IAddress | null>(prevAddr);
  const [autoComplete, setAutoComplete] = useState<google.maps.places.Autocomplete | null>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
    libraries: LIBS,
  });

  useEffect(() => {
    if (isLoaded) {
      const mapOptions: google.maps.MapOptions = {
        center: center,
        zoom: 17,
        mapId: 'CITY_GUIDE_MAP',
      };
      setMap(new google.maps.Map(mapRef.current!, mapOptions));
      setAutoComplete(
        new google.maps.places.Autocomplete(placesRef.current!, {
          fields: ['address_components', 'formatted_address', 'geometry', 'name', 'place_id'],
        })
      );
    }
  }, [isLoaded, center]);
  useEffect(() => {
    if (autoComplete) {
      const setMarker = (position: google.maps.LatLng, title: string, name: string) => {
        if (!map) return;
        map.setCenter(position);
        const marker = new google.maps.marker.AdvancedMarkerElement({ map, position, title });
        // const infoCard = new google.maps.InfoWindow({
        //   position,
        //   content: buildMapInfoCard(title, name),
        //   maxWidth: 200,
        // });
        // infoCard.open({ map, anchor: marker });
      };
      const acListen = autoComplete.addListener('place_changed', () => {
        const placeResult = autoComplete.getPlace();
        const formattedPlace = addressFormatter(placeResult);
        setAddress(formattedPlace);
        setAddr(formattedPlace);
        if (placeResult.geometry?.location)
          setMarker(placeResult.geometry.location, placeResult.name!, placeResult.formatted_address!);
      });
      return () => acListen.remove();
    }
  }, [autoComplete, map, setAddr]);
  return (
    <div ref={mapRef} className="flex flex-col gap-4 h-[50vh] w-full">
      <Input
        className="bg-white rounded-2xl shadow-2xl focus:outline-none"
        variant="bordered"
        ref={placesRef}
        radius="lg"
      />
      {isLoaded ? <div className="w-full h-full rounded-xl border border-gray-200" ref={mapRef} /> : null}
      <Textarea className="flex-1 h-full" label="Extra details" />
      <div className="flex flex-wrap items-center gap-4 px-4 py-2 bg-[#f4f4f5] rounded-xl">
        <div className="flex flex-col items-center">
          <p className="text-sm text-black/60 font-medium">{address?.name ?? 'NA'}</p>
          <h6 className="text-accentGray text-xs font-bold">Name</h6>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-black/60 font-medium">{address?.city ?? 'NA'}</p>
          <h6 className="text-accentGray text-xs font-bold">City</h6>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-black/60 font-medium">{address?.state ?? 'NA'}</p>
          <h6 className="text-accentGray text-xs font-bold">State</h6>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-black/60 font-medium">{address?.country ?? 'NA'}</p>
          <h6 className="text-accentGray text-xs font-bold">Country</h6>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-black/60 font-medium">
            {address?.geoLocation.lat ? `${address.geoLocation.lat}, ${address.geoLocation.lng}` : 'NA'}
          </p>
          <h6 className="text-accentGray text-xs font-bold">Geolocation</h6>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-black/60 font-medium">{address?.fullAddress ?? 'NA'}</p>
          <h6 className="text-accentGray text-xs font-bold">Full Address</h6>
        </div>
      </div>
    </div>
  );
};

export default Map;
