import { AllTrendingStays, Header } from '@/containers';
import { getTrendingStays } from '@/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const TrendingStaysPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['trending-stays'],
    queryFn: getTrendingStays,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
      <main className="flex flex-col gap-20 bg-white">
        <div className="container mx-auto px-10 flex flex-col gap-6 max-w-7xl">
          <AllTrendingStays />
        </div>
      </main>
    </HydrationBoundary>
  );
};

export default TrendingStaysPage;
