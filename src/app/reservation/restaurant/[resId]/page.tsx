import { HeaderNav } from '@/components';
import { RestaurantDetailReservation, RestaurantUserDetailReservation } from '@/containers';
import { getRestaurantById, getUser } from '@/server';
import toast from 'react-hot-toast';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { PiNumberCircleTwoBold, PiNumberCircleThreeBold } from 'react-icons/pi';

interface Props {
  params: {
    resId: string;
  };
}

const ReserveRestaurantPage = async ({ params: { resId } }: Props) => {
  try {
    const restaurant = await getRestaurantById(resId);
    const user = await getUser();
    if (!restaurant) return null;
    return (
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
          <div className="grid grid-cols-10 gap-4">
            <div className="col-span-3">
              <RestaurantDetailReservation {...restaurant} />
            </div>
            <div className="col-span-7">
              <RestaurantUserDetailReservation restaurant={restaurant} user={user} />
            </div>
          </div>
        </main>
      </div>
    );
  } catch (err: any) {
    toast.error(err.message);
    return null;
  }
};

export default ReserveRestaurantPage;
