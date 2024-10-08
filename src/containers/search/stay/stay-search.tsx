'use client';

import { SearchCardLoader, SearchStayCard, SearchStayFilterBox } from '@/components';
import { StaySearchBar } from '@/containers';
import { useSearchStore } from '@/providers';
import { getStaySearch } from '@/server';
import { IStay } from '@/types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  searchParam?: string[];
}

const StaySearchPage = ({ searchParam }: Props) => {
  const { checkInDay, checkOutDay, location, noOfGuests, reservationCount } = useSearchStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchResult, setSearchResult] = useState<IStay[]>();
  const [filteredResult, setFilteredResult] = useState<IStay[]>([]);

  const searchStay = async () => {
    try {
      setIsLoading(true);
      const stays = await getStaySearch(
        location?.geoLocation,
        checkInDay,
        checkOutDay,
        !!noOfGuests.children,
        noOfGuests.adults + noOfGuests.children,
        reservationCount
      );
      setSearchResult(stays);
      setFilteredResult(stays);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!searchResult && (location || searchParam)) (async () => await searchStay())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, searchParam, searchResult]);
  return (
    <>
      <StaySearchBar extraClass="-mt-7" search={searchStay} />
      <div className="grid grid-cols-10 items-start gap-4 pb-10">
        <div className="col-span-3 flex flex-col border rounded-xl">
          <h3 className="text-lg font-bold border-b px-3 py-4">Filter by: </h3>
          <SearchStayFilterBox stays={searchResult} types={searchParam} filterStays={setFilteredResult} />
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
                  filteredResult.map((stay) => <SearchStayCard key={stay._id} {...stay} />)
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

export default StaySearchPage;
