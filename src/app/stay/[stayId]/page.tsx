import { StayDetailNav } from '@/components';
import { Footer, Header, StayDetailContainer, SubscribeBox } from '@/containers';
import { getStayById } from '@/server';
import { QueryClient } from '@tanstack/react-query';

interface IStayDetailPage {
  params: {
    stayId: string;
  };
}

const StayDetailPage = async ({ params: { stayId } }: IStayDetailPage) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['stay', stayId],
    queryFn: async () => await getStayById(stayId),
  });
  return (
    <>
      <Header />
      <main className="flex flex-col gap-20 bg-white">
        <div className="container mx-auto px-10 flex flex-col gap-6 max-w-7xl">
          <StayDetailNav />
          <StayDetailContainer stayId={stayId} />
        </div>
        <SubscribeBox />
      </main>
      <Footer />
    </>
  );
};

export default StayDetailPage;
