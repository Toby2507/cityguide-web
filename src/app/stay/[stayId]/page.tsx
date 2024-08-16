import { StayDetailNav } from '@/components';
import {
  Footer,
  Header,
  StayDetailAmenities,
  StayDetailAvailability,
  StayDetailOverview,
  StayDetailRules,
  SubscribeBox,
} from '@/containers';
import { getStayById } from '@/server';

interface IStayDetailPage {
  params: {
    stayId: string;
  };
}

const StayDetailPage = async ({ params: { stayId } }: IStayDetailPage) => {
  const stay = await getStayById(stayId);
  if (!stay) return null;
  return (
    <>
      <Header />
      <main className="flex flex-col gap-20 bg-white">
        <div className="container mx-auto px-10 flex flex-col gap-6 max-w-7xl">
          <StayDetailNav />
          <StayDetailOverview stay={stay} />
          <StayDetailAmenities stay={stay} />
          <StayDetailAvailability stay={stay} />
          <StayDetailRules stay={stay} />
        </div>
        <SubscribeBox />
      </main>
      <Footer />
    </>
  );
};

export default StayDetailPage;
