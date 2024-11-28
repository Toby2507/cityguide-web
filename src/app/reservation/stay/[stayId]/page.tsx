import { StayReservationDetail } from '@/containers';
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
    </HydrationBoundary>
  );
};

export default ReserveStayPage;
