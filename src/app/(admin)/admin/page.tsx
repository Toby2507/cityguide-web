import { AdminDashboard, AdminProperties, AdminReservation } from '@/containers';

const AdminDashboardPage = () => {
  return (
    <div className="flex flex-col gap-6 pb-20">
      <AdminDashboard />
      <AdminProperties />
      <AdminReservation />
    </div>
  );
};

export default AdminDashboardPage;
