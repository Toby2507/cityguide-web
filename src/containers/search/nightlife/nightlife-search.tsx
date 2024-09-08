'use client';

import { SearchCardLoader, SearchNightlifeCard, SearchNightlifeFilterBox } from '@/components';
import { NightlifeSearchBar } from '@/containers';
import { useSearchStore } from '@/providers';
import { getNightlifeSearch } from '@/server';
import { INightLife } from '@/types';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  searchParam?: string[];
}

const NightlifeSearchPage = ({ searchParam }: Props) => {
  const { checkInDay, location, minAge } = useSearchStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchResult, setSearchResult] = useState<INightLife[]>();
  const [filteredResult, setFilteredResult] = useState<INightLife[]>([]);

  const searchNightlife = async () => {
    try {
      setIsLoading(true);
      const day = dayjs(checkInDay).isValid() ? dayjs(checkInDay).format('dddd|HH:mm') : '|';
      const nightlifes = await getNightlifeSearch(location?.geoLocation, day.split('|')[0], day.split('|')[1], minAge);
      setSearchResult(nightlifes);
      setFilteredResult(nightlifes);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!searchResult && (location || searchParam)) (async () => await searchNightlife())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, searchParam, searchResult]);
  return (
    <>
      <NightlifeSearchBar extraClass="-mt-7" search={searchNightlife} />
      <div className="grid grid-cols-10 items-start gap-4 pb-10">
        <div className="col-span-3 flex flex-col border rounded-xl">
          <h3 className="text-lg font-bold border-b px-3 py-4">Filter by: </h3>
          <SearchNightlifeFilterBox
            nightlifes={searchResult}
            types={searchParam}
            filterNightlifes={setFilteredResult}
          />
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
                  filteredResult.map((nightlife) => <SearchNightlifeCard key={nightlife._id} {...nightlife} />)
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

export default NightlifeSearchPage;
