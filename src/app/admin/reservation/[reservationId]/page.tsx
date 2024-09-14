import { ErrorDisplay, ReservationProperty } from '@/components';
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
      <section className="flex flex-col gap-4 max-w-5xl p-4 border rounded-xl shadow-2xl mt-6 mx-auto w-full">
        <ReservationProperty property={property} reservation={reservation} />
      </section>
    );
  } catch (err: any) {
    return <ErrorDisplay error={err.message} />;
  }
};

export default AdminReservationDetailPage;
