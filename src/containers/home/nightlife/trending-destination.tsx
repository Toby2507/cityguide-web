import { ErrorDisplay, PlaceCard, SectionHeader } from '@/components';
import { getTrendingNightlifes } from '@/server';
import { paths } from '@/utils';

const NightlifeTrendingDestination = async () => {
  try {
    const nightlifes = await getTrendingNightlifes();
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
  } catch (err: any) {
    return <ErrorDisplay error={err.message} />;
  }
};

export default NightlifeTrendingDestination;
