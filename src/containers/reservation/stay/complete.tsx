'use client';

import { getStayById } from '@/server';
import { useQuery } from '@tanstack/react-query';
import StayDetailReservation from './stay-detail';
import UserCompleteReservation from '../user-complete';
import { PropertyType } from '@/types';

interface Props {
  stayId: string;
}

const StayReservationComplete = ({ stayId }: Props) => {
  const { data: stay, isPending } = useQuery({
    queryKey: ['stay', stayId],
    queryFn: async () => await getStayById(stayId),
  });

  if (!stay || isPending) return null;
  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="col-span-3">
        <StayDetailReservation onlyInfo {...stay} />
      </div>
      <div className="col-span-7">
        <UserCompleteReservation data={stay} type={PropertyType.STAY} />
      </div>
    </div>
  );
};

export default StayReservationComplete;
