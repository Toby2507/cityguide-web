'use client';

import { IAddress, LatLng } from '@/types';
import { addressFormatter } from '@/utils';
import { Library } from '@googlemaps/js-api-loader';
import { Input } from '@nextui-org/react';
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
}

const Map = ({ center }: IMap) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const placesRef = useRef<HTMLInputElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [address, setAddress] = useState<IAddress | null>(null);
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
        if (placeResult.geometry?.location)
          setMarker(placeResult.geometry.location, placeResult.name!, placeResult.formatted_address!);
      });
      return () => acListen.remove();
    }
  }, [autoComplete, map]);
  return (
    <div className="h-80 w-screen">
      <Input ref={placesRef} />
      {isLoaded ? <div className="w-full h-full rounded-xl" ref={mapRef} /> : null}
    </div>
  );
};

export default Map;
