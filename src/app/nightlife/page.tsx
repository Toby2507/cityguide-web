import {
  Destinations,
  DiscoverHome,
  Footer,
  HomeHeader,
  NightlifeCategories,
  NightlifeSearchBar,
  NightlifeTrendingDestinations,
  TopOffers,
} from '@/containers';
import { getTrendingNightlifes } from '@/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const NightlifeHomePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['trending-nightlifes'],
    queryFn: getTrendingNightlifes,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeHeader />
      <main className="flex flex-col gap-14 bg-white pb-20">
        <div className="container mx-auto px-10 flex flex-col gap-10 max-w-7xl">
          <NightlifeSearchBar extraClass="-mt-7" isMain />
          <TopOffers />
          <NightlifeTrendingDestinations />
        </div>
        <DiscoverHome />
        <div className="container mx-auto px-10 flex flex-col gap-10 max-w-7xl">
          <NightlifeCategories />
          <Destinations />
        </div>
      </main>
      <Footer />
    </HydrationBoundary>
  );
};

export default NightlifeHomePage;
