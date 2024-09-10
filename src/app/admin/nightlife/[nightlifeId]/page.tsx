import { ErrorDisplay } from '@/components';
import { AdminNightlifeDetail } from '@/containers';
import { getNightlifeById } from '@/server';

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
    return <ErrorDisplay error={err.message} />;
  }
};

export default NightlifeDetailPage;
