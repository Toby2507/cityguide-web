import {
  Destinations,
  DiscoverHome,
  Footer,
  HomeHeader,
  StayCategories,
  StaySearchBar,
  SubscribeBox,
  TopOffers,
  TrendingDestinations,
} from '@/containers';

const HomePage = () => {
  return (
    <>
      <HomeHeader />
      <main className="flex flex-col gap-36 bg-white">
        <div className="container mx-auto px-10 flex flex-col gap-20 max-w-7xl">
          <StaySearchBar />
          <TopOffers />
          <TrendingDestinations />
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

export default HomePage;
