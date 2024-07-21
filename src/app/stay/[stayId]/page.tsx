import { StayDetailNav } from '@/components';
import {
  Footer,
  Header,
  StayDetailAmenities,
  StayDetailAvailability,
  StayDetailOverview,
  StayDetailRules,
  StaySearchBar,
  SubscribeBox,
} from '@/containers';
import { stays } from '@/data';

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
          <StayDetailOverview stay={stays[0]} />
          <StayDetailAmenities stay={stays[0]} />
          <StayDetailAvailability stay={stays[0]} />
          <StayDetailRules stay={stays[0]} />
        </div>
        <SubscribeBox />
      </main>
      <Footer />
    </>
  );
};

export default StayDetailPage;
