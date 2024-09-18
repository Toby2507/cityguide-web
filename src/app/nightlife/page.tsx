import {
  Destinations,
  DiscoverHome,
  Footer,
  HomeHeader,
  NightlifeCategories,
  NightlifeSearchBar,
  NightlifeTrendingDestinations,
  SubscribeBox,
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
      <main className="flex flex-col gap-36 bg-white">
        <div className="container mx-auto px-10 flex flex-col gap-20 max-w-7xl">
          <NightlifeSearchBar extraClass="-mt-9" isMain />
          <TopOffers />
          <NightlifeTrendingDestinations />
        </div>
        <DiscoverHome />
        <div className="container mx-auto px-10 flex flex-col gap-20 max-w-7xl">
          <NightlifeCategories />
          <Destinations />
        </div>
        <SubscribeBox />
      </main>
      <Footer />
    </HydrationBoundary>
  );
};

export default NightlifeHomePage;
