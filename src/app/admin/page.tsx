import { AdminDashboard, AdminReservation } from '@/containers';
import { reservations } from '@/data';

const AdminDashboardPage = async () => {
  return (
    <div className="flex flex-col gap-6 pb-20">
      <AdminDashboard />
      <AdminReservation reservations={reservations} />
    </div>
  );
};

export default AdminDashboardPage;
