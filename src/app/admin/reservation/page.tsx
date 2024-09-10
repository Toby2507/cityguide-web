import { AdminReservation } from '@/containers';
import { getPartnerReservation } from '@/server';
import toast from 'react-hot-toast';

const AdminReservationsPage = async () => {
  try {
    const reservations = await getPartnerReservation();
    return <AdminReservation reservations={reservations} />;
  } catch (err: any) {
    toast.error(err.message);
    return null;
  }
};

export default AdminReservationsPage;
