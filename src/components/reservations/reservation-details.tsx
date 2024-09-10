import { IReservation } from '@/types';

interface Props {
  reservation: IReservation;
}

const ReservationDetails = ({ reservation }: Props) => {
  return (
    <section className="col-span-1 flex flex-col gap-4 p-6">
      <h2 className="text-lg font-semibold">{reservation._id}</h2>
    </section>
  );
};

export default ReservationDetails;
