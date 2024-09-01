'use client';

import { useSearchStore } from '@/providers';
import { getRestaurantSearch } from '@/server';
import { IRestaurant } from '@/types';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

interface Props {
  searchParam?: string[];
}

const RestaurantSearchPage = ({ searchParam }: Props) => {
  const { checkInDay, location, noOfGuests, reservationCount } = useSearchStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<IRestaurant[]>();
  const [filteredResult, setFilteredResult] = useState<IRestaurant[]>([]);

  const searchRestaurant = async () => {
    setIsLoading(true);
    const day = dayjs(checkInDay).isValid() ? dayjs(checkInDay).format('dddd|HH:mm') : '|';
    const restaurants = await getRestaurantSearch(
      location?.geoLocation,
      day.split('|')[0],
      day.split('|')[1],
      !!noOfGuests.children,
      noOfGuests.adults + noOfGuests.children,
      reservationCount
    );
    setSearchResult(restaurants);
    setFilteredResult(restaurants);
    setIsLoading(false);
  };
  useEffect(() => {
    if (!searchResult && (location || searchParam)) (async () => await searchRestaurant())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>RestaurantSearchPage</div>;
};

export default RestaurantSearchPage;
