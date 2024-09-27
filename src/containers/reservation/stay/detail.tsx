'use client';

import { getStayById } from '@/server';
import { IUserDetails } from '@/types';
import { useQuery } from '@tanstack/react-query';
import StayDetailReservation from './stay-detail';
import UserDetailReservation from './user-detail';

interface Props {
  stayId: string;
  user: IUserDetails | null;
}

const StayReservationDetails = ({ stayId, user }: Props) => {
  const { data: stay, isPending } = useQuery({
    queryKey: ['stay', stayId],
    queryFn: async () => await getStayById(stayId),
  });

  if (!stay || isPending) return null;
  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="col-span-3">
        <StayDetailReservation {...stay} />
      </div>
      <div className="col-span-7">
        <UserDetailReservation stay={stay} user={user} />
      </div>
    </div>
  );
};

export default StayReservationDetails;
