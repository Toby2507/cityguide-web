'use client';

import { getRestaurantById } from '@/server';
import { useQuery } from '@tanstack/react-query';
import RestaurantDetailReservation from './restaurant-detail';
import UserCompleteReservation from '../user-complete';
import { PropertyType } from '@/types';

interface Props {
  resId: string;
}

const RestaurantReservationComplete = ({ resId }: Props) => {
  const { data: restaurant, isPending } = useQuery({
    queryKey: ['restaurant', resId],
    queryFn: async () => await getRestaurantById(resId),
  });

  if (!restaurant || isPending) return null;
  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="col-span-3">
        <RestaurantDetailReservation onlyInfo {...restaurant} />
      </div>
      <div className="col-span-7">
        <UserCompleteReservation data={restaurant} type={PropertyType.RESTAURANT} />
      </div>
    </div>
  );
};

export default RestaurantReservationComplete;
