import { NightlifeDetailNav } from '@/components';
import {
  DetailPageAmenities,
  DetailPageOverview,
  Footer,
  Header,
  NightlifeDetailInfo,
  SubscribeBox,
} from '@/containers';
import { getNightlifeById } from '@/server';
import { PropertyType } from '@/types';
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
    return (
      <>
        <Header />
        <main className="flex flex-col gap-20 bg-white">
          <div className="container mx-auto px-10 flex flex-col gap-6 max-w-7xl">
            <NightlifeDetailNav />
            <DetailPageOverview
              amenities={nightlife.details.amenities}
              propType={PropertyType.NIGHTLIFE}
              {...nightlife}
            />
            <DetailPageAmenities amenities={nightlife.details.amenities} {...nightlife} />
            <NightlifeDetailInfo nightlife={nightlife} />
          </div>
          <SubscribeBox />
        </main>
        <Footer />
      </>
    );
  } catch (err: any) {
    toast.error(err.message);
    return null;
  }
};

export default NightlifeDetailPage;
