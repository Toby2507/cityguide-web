import { AllTrendingNightlifes, Header } from '@/containers';
import { getTrendingNightlifes } from '@/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const TrendingNightlifesPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['trending-nightlifes'],
    queryFn: getTrendingNightlifes,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
      <main className="flex flex-col gap-20 bg-white">
        <div className="container mx-auto px-10 flex flex-col gap-6 max-w-7xl">
          <AllTrendingNightlifes />
        </div>
      </main>
    </HydrationBoundary>
  );
};

export default TrendingNightlifesPage;
