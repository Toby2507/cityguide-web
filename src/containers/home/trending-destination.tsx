import { PlaceCard, SectionHeader } from '@/components';
import { trendingPlaces } from '@/data';

const TrendingDestinations = () => {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader title="Trending destinations" desc="Most popular choices for travelers from Nigeria" viewUrl="#" />
      <div className="flex flex-wrap pt-6 px-2">
        {trendingPlaces.map((place) => (
          <PlaceCard key={place.id} {...place} />
        ))}
      </div>
    </section>
  );
};

export default TrendingDestinations;
