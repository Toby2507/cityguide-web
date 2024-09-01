import { PlaceCard, SectionHeader } from '@/components';
import { getTrendingRestaurants } from '@/server';

const RestaurantTrendingDestination = async () => {
  const restaurants = await getTrendingRestaurants();
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader title="Trending destinations" desc="Most popular choices for travelers from Nigeria" viewUrl="#" />
      <div className="grid grid-cols-3 gap-4 px-2">
        {restaurants?.map((place) => (
          <PlaceCard key={place._id} {...place} />
        ))}
      </div>
    </section>
  );
};

export default RestaurantTrendingDestination;