import { AdminNightlifeDetail } from '@/containers';
import { getNightlifeById } from '@/server';
import toast from 'react-hot-toast';

interface Props {
  params: {
    nightlifeId: string;
  };
}

const NightlifeDetailPage = async ({ params: { nightlifeId } }: Props) => {
  try {
    const nightlife = await getNightlifeById(nightlifeId);
    if (!nightlife) return null;
    return <AdminNightlifeDetail nightlife={nightlife} />;
  } catch (err: any) {
    toast.error(err.message);
    return null;
  }
};

export default NightlifeDetailPage;
