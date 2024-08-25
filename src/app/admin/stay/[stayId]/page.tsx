import { AdminStayDetail } from '@/containers';
import { getStayById } from '@/server';

interface Props {
  params: {
    stayId: string;
  };
}

const AdminStayDetailPage = async ({ params: { stayId } }: Props) => {
  const stay = await getStayById(stayId);
  if (!stay) return null;
  return <AdminStayDetail stay={stay} />;
};

export default AdminStayDetailPage;
