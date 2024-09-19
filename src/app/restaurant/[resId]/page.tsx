import { RestaurantDetailNav } from '@/components';
import { Footer, Header, RestaurantDetailContainer, SubscribeBox } from '@/containers';
import { getRestaurantById } from '@/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

interface Props {
  params: {
    resId: string;
  };
}

const RestaurantDetailPage = async ({ params: { resId } }: Props) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['restaurant', resId],
    queryFn: async () => await getRestaurantById(resId),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
      <main className="flex flex-col gap-20 bg-white">
        <div className="container mx-auto px-10 flex flex-col gap-6 max-w-7xl">
          <RestaurantDetailNav />
          <RestaurantDetailContainer resId={resId} />
        </div>
        <SubscribeBox />
      </main>
      <Footer />
    </HydrationBoundary>
  );
};

export default RestaurantDetailPage;
