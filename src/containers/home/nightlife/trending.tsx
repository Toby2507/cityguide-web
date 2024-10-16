'use client';

import { PlaceCard, SectionHeader } from '@/components';
import { getTrendingNightlifes } from '@/server';
import { paths } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import NightlifeSearchBar from './search';

const AllTrendingNightlifes = () => {
  const { data: nightlifes, isPending } = useQuery({
    queryKey: ['trending-nightlifes'],
    queryFn: getTrendingNightlifes,
  });

  if (!nightlifes?.length || isPending) return null;
  return (
    <>
      <NightlifeSearchBar extraClass="-mt-7" isMain />
      <div className="flex flex-col gap-4 pb-28">
        <SectionHeader title="Trending stays" desc="Most popular choices for travelers from Nigeria" />
        <div className="grid grid-cols-3 gap-4 px-2">
          {nightlifes.map((nightlife) => (
            <PlaceCard key={nightlife._id} {...nightlife} refPath={paths.nightlifeDetail} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllTrendingNightlifes;
