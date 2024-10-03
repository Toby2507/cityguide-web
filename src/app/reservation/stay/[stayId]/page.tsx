import { HeaderNav } from '@/components';
import { Footer, StayReservationDetail } from '@/containers';
import { getStayById, getUser } from '@/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { PiNumberCircleThreeBold, PiNumberCircleTwoBold } from 'react-icons/pi';

interface Props {
  params: {
    stayId: string;
  };
}

const ReserveStayPage = async ({ params: { stayId } }: Props) => {
  const queryClient = new QueryClient();
  const [user] = await Promise.all([
    getUser(),
    queryClient.prefetchQuery({
      queryKey: ['stay', stayId],
      queryFn: async () => await getStayById(stayId),
    }),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="bg-white min-h-screen">
        <div className="bg-primary">
          <div className="container mx-auto px-4 pt-2 max-w-7xl">
            <HeaderNav noList />
          </div>
        </div>
        <main className="container mx-auto flex flex-col justify-center gap-10 px-10 py-8 max-w-7xl">
          <div className="relative flex items-center justify-between w-full">
            <div className="absolute top-1/2 w-full border-b-2" />
            <div className="flex items-center gap-2 bg-white pr-3 z-10">
              <IoCheckmarkCircle className="text-primary" size={24} />
              <p className="text-sm font-semibold">Your selection</p>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 z-10">
              <PiNumberCircleTwoBold className="text-primary" size={24} />
              <p className="text-sm font-semibold">Your details</p>
            </div>
            <div className="flex items-center gap-2 bg-white pl-3 z-10">
              <PiNumberCircleThreeBold className="text-gray-500" size={24} />
              <p className="text-sm text-gray-500 font-semibold">Final step</p>
            </div>
          </div>
          <StayReservationDetail user={user} stayId={stayId} />
        </main>
        <Footer />
      </div>
    </HydrationBoundary>
  );
};

export default ReserveStayPage;
