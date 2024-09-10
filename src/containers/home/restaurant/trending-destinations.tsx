import { ErrorDisplay, PlaceCard, SectionHeader } from '@/components';
import { getTrendingRestaurants } from '@/server';
import { paths } from '@/utils';

const RestaurantTrendingDestination = async () => {
  try {
    const restaurants = await getTrendingRestaurants();
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
  } catch (err: any) {
    return <ErrorDisplay error={err.message} />;
  }
};

export default RestaurantTrendingDestination;
