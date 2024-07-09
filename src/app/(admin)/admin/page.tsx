import { AdminDashboard, AdminReservation } from '@/containers';

const AdminDashboardPage = async () => {
  return (
    <div className="flex flex-col gap-6 pb-20">
      <AdminDashboard />
      <AdminReservation />
    </div>
  );
};

export default AdminDashboardPage;
