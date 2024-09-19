import { getStayById } from '@/server';
import { IUserDetails } from '@/types';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import StayDetailReservation from './stay-detail';
import UserDetailReservation from './user-detail';

interface Props {
  stayId: string;
  user: IUserDetails | null;
}

const ReservationDetails = ({ stayId, user }: Props) => {
  const {
    data: stay,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['stay', stayId],
    queryFn: async () => await getStayById(stayId),
  });

  if (isPending) return null;
  if (isError) return toast.error(error.message);
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

export default ReservationDetails;
