import { ErrorDisplay, PlaceCard, SectionHeader } from '@/components';
import { getTrendingStays } from '@/server';
import { paths } from '@/utils';

const TrendingDestinations = async () => {
  try {
    const stays = await getTrendingStays();
    return (
      <section className="flex flex-col gap-4">
        <SectionHeader
          title="Trending stays"
          desc="Most popular choices for travelers from Nigeria"
          viewUrl={stays.length > 6 ? '#' : ''}
        />
        <div className="grid grid-cols-3 gap-4 px-2">
          {stays?.slice(0, 6).map((place) => (
            <PlaceCard key={place._id} {...place} refPath={paths.stayDetail} />
          ))}
        </div>
      </section>
    );
  } catch (err: any) {
    return <ErrorDisplay error={err.message} />;
  }
};

export default TrendingDestinations;
