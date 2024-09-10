import { ErrorDisplay, StayDetailNav } from '@/components';
import {
  DetailPageAmenities,
  DetailPageOverview,
  Footer,
  Header,
  StayDetailAvailability,
  StayDetailInfoReview,
  StayDetailRules,
  SubscribeBox,
} from '@/containers';
import { getStayById } from '@/server';
import { PropertyType } from '@/types';

interface IStayDetailPage {
  params: {
    stayId: string;
  };
}

const StayDetailPage = async ({ params: { stayId } }: IStayDetailPage) => {
  try {
    const stay = await getStayById(stayId);
    if (!stay) return null;
    return (
      <>
        <Header />
        <main className="flex flex-col gap-20 bg-white">
          <div className="container mx-auto px-10 flex flex-col gap-6 max-w-7xl">
            <StayDetailNav />
            <DetailPageOverview propType={PropertyType.STAY} {...stay} />
            <DetailPageAmenities {...stay} />
            <StayDetailAvailability stay={stay} />
            <StayDetailInfoReview stay={stay} />
            <StayDetailRules stay={stay} />
          </div>
          <SubscribeBox />
        </main>
        <Footer />
      </>
    );
  } catch (err: any) {
    return <ErrorDisplay error={err.message} />;
  }
};

export default StayDetailPage;
