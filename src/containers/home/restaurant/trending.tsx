'use client';

import { PlaceCard, SectionHeader } from '@/components';
import { getTrendingRestaurants } from '@/server';
import { paths } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import RestaurantSearchBar from './search';

const AllTrendingRestaurants = () => {
  const { data: restaurants, isPending } = useQuery({
    queryKey: ['trending-restaurants'],
    queryFn: getTrendingRestaurants,
  });

  if (!restaurants?.length || isPending) return null;
  return (
    <>
      <RestaurantSearchBar extraClass="-mt-7" isMain />
      <div className="flex flex-col gap-4 pb-28">
        <SectionHeader title="Trending stays" desc="Most popular choices for travelers from Nigeria" />
        <div className="grid grid-cols-3 gap-4 px-2">
          {restaurants.map((restaurant) => (
            <PlaceCard key={restaurant._id} {...restaurant} refPath={paths.restaurantDetail} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllTrendingRestaurants;
