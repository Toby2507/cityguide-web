import { StayDetailNav } from '@/components';
import { Header, StayDetailAmenities, StayDetailAvailability, StayDetailOverview, StaySearchBar } from '@/containers';

interface IStayDetailPage {
  params: {
    stayId: string;
  };
}

const StayDetailPage = ({ params: { stayId } }: IStayDetailPage) => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-10 flex flex-col gap-6 max-w-7xl">
        <StaySearchBar />
        <StayDetailNav />
        <StayDetailOverview />
        <StayDetailAmenities />
        <StayDetailAvailability />
      </main>
    </>
  );
};

export default StayDetailPage;
