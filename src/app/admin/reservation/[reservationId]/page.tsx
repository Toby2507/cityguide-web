import { ErrorDisplay, ReservationDetails, ReservationProperty } from '@/components';
import { getPropertyById, getReservationById } from '@/server';

interface Props {
  params: {
    reservationId: string;
  };
}

const AdminReservationDetailPage = async ({ params: { reservationId } }: Props) => {
  try {
    const reservation = await getReservationById(reservationId);
    if (!reservation) return null;
    const property = await getPropertyById(reservation.property, reservation.propertyType);
    return (
      <div className="grid grid-cols-10 border rounded-2xl mt-6">
        <ReservationProperty property={property} reservation={reservation} />
        <ReservationDetails reservation={reservation} />
      </div>
    );
  } catch (err: any) {
    return <ErrorDisplay error={err.message} />;
  }
};

export default AdminReservationDetailPage;
