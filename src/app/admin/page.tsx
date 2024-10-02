import { AdminDashboard } from '@/containers';
import { getAdminAnalytics } from '@/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const AdminDashboardPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['dashboard-analytics'],
    queryFn: getAdminAnalytics,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-6 pb-20">
        <AdminDashboard />
      </div>
    </HydrationBoundary>
  );
};

export default AdminDashboardPage;
