import { RestaurantReservationComplete } from '@/containers';
import { getRestaurantById } from '@/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { PiNumberCircleThreeBold } from 'react-icons/pi';

interface Props {
  params: {
    resId: string;
  };
}

const CompleteRestaurantReservationPage = async ({ params: { resId } }: Props) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['restaurant', resId],
    queryFn: async () => await getRestaurantById(resId),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="relative flex items-center justify-between w-full">
        <div className="absolute border-b-2 top-1/2 w-full" />
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
      <RestaurantReservationComplete resId={resId} />
    </HydrationBoundary>
  );
};

export default CompleteRestaurantReservationPage;
