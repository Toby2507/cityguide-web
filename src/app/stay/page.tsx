import {
  Destinations,
  DiscoverHome,
  Footer,
  HomeHeader,
  StayCategories,
  StaySearchBar,
  StayTrendingDestinations,
  SubscribeBox,
  TopOffers,
} from '@/containers';
import { getTrendingStays } from '@/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const StayHomePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['trending-stays'],
    queryFn: getTrendingStays,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeHeader />
      <main className="flex flex-col gap-14 bg-white">
        <div className="container mx-auto px-10 flex flex-col gap-10 max-w-7xl">
          <StaySearchBar extraClass="-mt-9" isMain />
          <TopOffers />
          <StayTrendingDestinations />
        </div>
        <DiscoverHome />
        <div className="container mx-auto px-10 flex flex-col gap-10 max-w-7xl">
          <StayCategories />
          <Destinations />
        </div>
        <SubscribeBox />
      </main>
      <Footer />
    </HydrationBoundary>
  );
};

export default StayHomePage;
