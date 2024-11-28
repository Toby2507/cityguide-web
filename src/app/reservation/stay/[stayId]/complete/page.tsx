import { StayReservationComplete } from '@/containers';
import { getStayById } from '@/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { PiNumberCircleThreeBold } from 'react-icons/pi';

interface Props {
  params: {
    stayId: string;
  };
}

const CompleteStayReservationPage = async ({ params: { stayId } }: Props) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['stay', stayId],
    queryFn: async () => await getStayById(stayId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="relative flex items-center justify-between w-full">
        <div className="absolute top-1/2 w-full border-b-2" />
        <div className="flex items-center gap-2 bg-white pr-3 z-10">
          <IoCheckmarkCircle className="text-primary" size={24} />
          <p className="text-sm font-semibold">Your selection</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 z-10">
          <IoCheckmarkCircle className="text-primary" size={24} />
          <p className="text-sm font-semibold">Your details</p>
        </div>
        <div className="flex items-center gap-2 bg-white pl-3 z-10">
          <PiNumberCircleThreeBold className="text-primary" size={24} />
          <p className="text-sm font-semibold">Final step</p>
        </div>
      </div>
      <StayReservationComplete stayId={stayId} />
    </HydrationBoundary>
  );
};

export default CompleteStayReservationPage;
