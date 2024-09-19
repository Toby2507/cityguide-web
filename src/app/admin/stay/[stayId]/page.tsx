import { AdminStayDetail } from '@/containers';
import { getStayById } from '@/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

interface Props {
  params: {
    stayId: string;
  };
}

const AdminStayDetailPage = async ({ params: { stayId } }: Props) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['stay', stayId],
    queryFn: async () => await getStayById(stayId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminStayDetail stayId={stayId} />
    </HydrationBoundary>
  );
};

export default AdminStayDetailPage;
