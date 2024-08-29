'use client';

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
    console.log(stays);
    setSearchResult(stays);
  };
  useEffect(() => {
    if (!searchResult && location) (async () => await searchStay())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, searchResult]);
  if (!location) return null;
  return (
    <>
      <StaySearchBar extraClass="-mt-7" search={() => refetchPage(paths.searchStay(searchParam))} />
    </>
  );
};

export default StaySearchPage;
