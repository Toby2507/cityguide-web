import { AdminNightlifeDetail } from '@/containers';
import { getNightlifeById } from '@/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

interface Props {
  params: {
    nightlifeId: string;
  };
}

const NightlifeDetailPage = async ({ params: { nightlifeId } }: Props) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['nightlife', 'admin', nightlifeId],
    queryFn: async () => await getNightlifeById(nightlifeId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminNightlifeDetail nightlifeId={nightlifeId} />
    </HydrationBoundary>
  );
};

export default NightlifeDetailPage;
