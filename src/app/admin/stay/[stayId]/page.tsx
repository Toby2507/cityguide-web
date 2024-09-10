import { ErrorDisplay } from '@/components';
import { AdminStayDetail } from '@/containers';
import { getStayById } from '@/server';

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
    return <ErrorDisplay error={err.message} />;
  }
};

export default AdminStayDetailPage;
