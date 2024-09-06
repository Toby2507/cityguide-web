import { AdminStayDetail } from '@/containers';
import { getStayById } from '@/server';
import toast from 'react-hot-toast';

interface Props {
  params: {
    stayId: string;
  };
}

const AdminStayDetailPage = async ({ params: { stayId } }: Props) => {
  try {
    const stay = await getStayById(stayId);
    if (!stay) return null;
    return <AdminStayDetail stay={stay} />;
  } catch (err: any) {
    toast.error(err.message);
    return null;
  }
};

export default AdminStayDetailPage;
