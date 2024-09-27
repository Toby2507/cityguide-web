'use client';

import { getRestaurantById } from '@/server';
import { IUserDetails } from '@/types';
import { useQuery } from '@tanstack/react-query';
import RestaurantDetailReservation from './restaurant-detail';
import RestaurantUserDetailReservation from './user-detail';

interface Props {
  resId: string;
  user: IUserDetails | null;
}

const RestaurantReservationDetail = ({ resId, user }: Props) => {
  const { data: restaurant, isPending } = useQuery({
    queryKey: ['restaurant', resId],
    queryFn: async () => await getRestaurantById(resId),
  });

  if (!restaurant || isPending) return null;
  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="col-span-3">
        <RestaurantDetailReservation {...restaurant} />
      </div>
      <div className="col-span-7">
        <RestaurantUserDetailReservation restaurant={restaurant} user={user} />
      </div>
    </div>
  );
};

export default RestaurantReservationDetail;
