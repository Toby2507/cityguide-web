import {
  Destinations,
  DiscoverHome,
  Footer,
  HomeHeader,
  StayCategories,
  StaySearchBar,
  StayTrendingDestinations,
  SubscribeBox,
  TopOffers,
} from '@/containers';

const StayHomePage = () => {
  return (
    <>
      <HomeHeader />
      <main className="flex flex-col gap-36 bg-white">
        <div className="container mx-auto px-10 flex flex-col gap-20 max-w-7xl">
          <StaySearchBar extraClass="-mt-9" isMain />
          <TopOffers />
          <StayTrendingDestinations />
        </div>
        <DiscoverHome />
        <div className="container mx-auto px-10 flex flex-col gap-20 max-w-7xl">
          <StayCategories />
          <Destinations />
        </div>
        <SubscribeBox />
      </main>
      <Footer />
    </>
  );
};

export default StayHomePage;
