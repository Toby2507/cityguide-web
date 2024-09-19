import { ErrorDisplay } from '@/components';
import { AdminRestaurantDetail } from '@/containers';
import { getRestaurantById } from '@/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

interface Props {
  params: {
    restaurantId: string;
  };
}

const AdminRestaurantDetailPage = async ({ params: { restaurantId } }: Props) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['restaurant', restaurantId],
    queryFn: async () => await getRestaurantById(restaurantId),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminRestaurantDetail restaurantId={restaurantId} />
    </HydrationBoundary>
  );
};

export default AdminRestaurantDetailPage;
