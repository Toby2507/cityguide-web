'use client';

import { PlaceCard, SectionHeader } from '@/components';
import { getTrendingStays } from '@/server';
import { paths } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import StaySearchBar from './search';

const AllTrendingStays = () => {
  const { data: stays, isPending } = useQuery({
    queryKey: ['trending-stays'],
    queryFn: getTrendingStays,
  });

  if (!stays?.length || isPending) return null;
  return (
    <>
      <StaySearchBar extraClass="-mt-7" isMain />
      <div className="flex flex-col gap-4 pb-28">
        <SectionHeader title="Trending stays" desc="Most popular choices for travelers from Nigeria" />
        <div className="grid grid-cols-3 gap-4 px-2">
          {stays.map((stay) => (
            <PlaceCard key={stay._id} {...stay} linkText="Reserve an accommodation" refPath={paths.stayDetail} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllTrendingStays;
