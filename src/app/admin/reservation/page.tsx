import { ErrorDisplay } from '@/components';
import { AdminReservation } from '@/containers';
import { getPartnerReservation } from '@/server';

const AdminReservationsPage = async () => {
  try {
    const reservations = await getPartnerReservation();
    return <AdminReservation reservations={reservations} />;
  } catch (err: any) {
    return <ErrorDisplay error={err.message} />;
  }
};

export default AdminReservationsPage;
