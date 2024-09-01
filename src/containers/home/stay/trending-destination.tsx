import { PlaceCard, SectionHeader } from '@/components';
import { getTrendingStays } from '@/server';
import { paths } from '@/utils';

const TrendingDestinations = async () => {
  const stays = await getTrendingStays();
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader title="Trending destinations" desc="Most popular choices for travelers from Nigeria" viewUrl="#" />
      <div className="grid grid-cols-3 gap-4 px-2">
        {stays?.map((place) => (
          <PlaceCard key={place._id} {...place} refPath={paths.stayDetail} />
        ))}
      </div>
    </section>
  );
};

export default TrendingDestinations;
