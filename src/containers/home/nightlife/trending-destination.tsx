'use client';

import { PlaceCard, SectionHeader } from '@/components';
import { getTrendingNightlifes } from '@/server';
import { paths } from '@/utils';
import { useQuery } from '@tanstack/react-query';

const NightlifeTrendingDestination = () => {
  const { data: nightlifes, isPending } = useQuery({
    queryKey: ['trending-nightlifes'],
    queryFn: getTrendingNightlifes,
  });

  if (!nightlifes?.length || isPending) return null;

  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Trending nightlifes"
        desc="Most popular choices for travelers from Nigeria"
        viewUrl={nightlifes.length > 6 ? '#' : ''}
      />
      <div className="grid grid-cols-3 gap-4 px-2">
        {nightlifes?.slice(0, 6).map((place) => (
          <PlaceCard key={place._id} {...place} refPath={paths.nightlifeDetail} />
        ))}
      </div>
    </section>
  );
};

export default NightlifeTrendingDestination;
