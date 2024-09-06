import { AdminNightlifeDetail } from '@/containers';
import { getNightlifeById } from '@/server';

interface Props {
  params: {
    nightlifeId: string;
  };
}

const NightlifeDetailPage = async ({ params: { nightlifeId } }: Props) => {
  const nightlife = await getNightlifeById(nightlifeId);
  if (!nightlife) return null;
  return <AdminNightlifeDetail nightlife={nightlife} />;
};

export default NightlifeDetailPage;
