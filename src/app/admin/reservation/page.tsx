import { AdminReservation } from '@/containers';
import { getPartnerReservation } from '@/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const AdminReservationsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['reservations', 'admin'],
    queryFn: getPartnerReservation,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminReservation />
    </HydrationBoundary>
  );
};

export default AdminReservationsPage;
