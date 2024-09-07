'use client';

import { RestaurantFilterBox, SearchCardLoader, SearchRestaurantCard } from '@/components';
import { RestaurantSearchBar } from '@/containers';
import { useSearchStore } from '@/providers';
import { getRestaurantSearch } from '@/server';
import { IRestaurant } from '@/types';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  searchParam?: string[];
}

const RestaurantSearchPage = ({ searchParam }: Props) => {
  const { checkInDay, location, noOfGuests, reservationCount } = useSearchStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchResult, setSearchResult] = useState<IRestaurant[]>();
  const [filteredResult, setFilteredResult] = useState<IRestaurant[]>([]);

  const searchRestaurant = async () => {
    try {
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
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!searchResult && (location || searchParam)) (async () => await searchRestaurant())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <RestaurantSearchBar extraClass="-mt-7" search={searchRestaurant} />
      <div className="grid grid-cols-10 items-start gap-4 pb-10">
        <div className="col-span-3 flex flex-col border rounded-xl">
          <h3 className="text-lg font-bold border-b px-3 py-4">Filter by: </h3>
          <RestaurantFilterBox restaurants={searchResult} prices={searchParam} filterRestaurants={setFilteredResult} />
        </div>
        <div className="col-span-7 flex flex-col gap-4">
          {isLoading ? (
            <SearchCardLoader />
          ) : (
            <>
              <h1 className="text-xl font-bold">
                {location ? `${location.fullAddress}: ` : ''}
                {filteredResult?.length || 0} properties found
              </h1>
              <div className="flex flex-col gap-4">
                {filteredResult ? (
                  filteredResult.map((stay) => <SearchRestaurantCard key={stay._id} {...stay} />)
                ) : (
                  <div className="grid place-items-center h-72">
                    <p className="text-sm text-accentGray font-medium">No Properties found</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RestaurantSearchPage;
