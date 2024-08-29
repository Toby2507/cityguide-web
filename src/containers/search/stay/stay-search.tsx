'use client';

import { SearchStayCard, SearchStayFilterBox } from '@/components';
import { StaySearchBar } from '@/containers';
import { useSearchStore } from '@/providers';
import { getStaySearch, refetchPage } from '@/server';
import { IStay } from '@/types';
import { paths } from '@/utils';
import { useEffect, useState } from 'react';

interface Props {
  searchParam?: string[];
}

const StaySearchPage = ({ searchParam }: Props) => {
  const { checkInDay, checkOutDay, location, noOfGuests, reservationCount } = useSearchStore();
  const [searchResult, setSearchResult] = useState<IStay[]>();

  const searchStay = async () => {
    const stays = await getStaySearch(
      location?.geoLocation!,
      checkInDay,
      checkOutDay,
      !!noOfGuests.children,
      noOfGuests.adults + noOfGuests.children,
      reservationCount
    );
    setSearchResult(stays);
  };
  useEffect(() => {
    if (!searchResult && location) (async () => await searchStay())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, searchResult]);
  return (
    <>
      <StaySearchBar extraClass="-mt-7" search={() => refetchPage(paths.searchStay(searchParam))} />
      <div className="grid grid-cols-10 gap-4 pb-10">
        <div className="col-span-3 flex flex-col border rounded-xl">
          <h3 className="text-lg font-bold border-b px-3 py-4">Filter by: </h3>
          <SearchStayFilterBox stays={searchResult || []} filterStays={setSearchResult} />
        </div>
        <div className="col-span-7 flex flex-col gap-4">
          <h1 className="text-xl font-bold">
            {location?.fullAddress}: {searchResult?.length || 0} properties found
          </h1>
          <div className="flex flex-col gap-4">
            {searchResult ? (
              searchResult.map((stay) => <SearchStayCard key={stay._id} {...stay} />)
            ) : (
              <div className="grid place-items-center h-72">
                <p className="text-sm text-accentGray font-medium">No Properties found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StaySearchPage;
