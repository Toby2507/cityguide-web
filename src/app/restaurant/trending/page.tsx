import { AllTrendingRestaurants, Header } from '@/containers';
import { getTrendingRestaurants } from '@/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const TrendingRestaurantsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['trending-restaurants'],
    queryFn: getTrendingRestaurants,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
      <main className="flex flex-col gap-20 bg-white">
        <div className="container mx-auto px-10 flex flex-col gap-6 max-w-7xl">
          <AllTrendingRestaurants />
        </div>
      </main>
    </HydrationBoundary>
  );
};

export default TrendingRestaurantsPage;
