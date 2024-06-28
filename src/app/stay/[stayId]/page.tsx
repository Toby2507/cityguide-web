import { StayDetailNav } from '@/components';
import {
  Footer,
  Header,
  StayDetailAmenities,
  StayDetailAvailability,
  StayDetailOverview,
  StaySearchBar,
  SubscribeBox,
} from '@/containers';

interface IStayDetailPage {
  params: {
    stayId: string;
  };
}

const StayDetailPage = ({ params: { stayId } }: IStayDetailPage) => {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-20 bg-white">
        <div className="container mx-auto px-10 flex flex-col gap-6 max-w-7xl">
          <StaySearchBar />
          <StayDetailNav />
          <StayDetailOverview />
          <StayDetailAmenities />
          <StayDetailAvailability />
        </div>
        <SubscribeBox />
      </main>
      <Footer />
    </>
  );
};

export default StayDetailPage;
