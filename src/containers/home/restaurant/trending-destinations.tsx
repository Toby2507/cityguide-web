'use client';

import { PlaceCard, SectionHeader } from '@/components';
import { getTrendingRestaurants } from '@/server';
import { paths } from '@/utils';
import { useQuery } from '@tanstack/react-query';

const RestaurantTrendingDestination = () => {
  const { data: restaurants, isPending } = useQuery({
    queryKey: ['trending-restaurants'],
    queryFn: getTrendingRestaurants,
  });

  if (!restaurants?.length || isPending) return null;
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Trending restaurants"
        desc="Most popular choices for travelers from Nigeria"
        viewUrl={restaurants.length > 6 ? '#' : ''}
      />
      <div className="grid grid-cols-3 gap-4 px-2">
        {restaurants?.slice(0, 6).map((place) => (
          <PlaceCard key={place._id} {...place} refPath={paths.restaurantDetail} />
        ))}
      </div>
    </section>
  );
};

export default RestaurantTrendingDestination;
