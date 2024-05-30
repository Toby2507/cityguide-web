import {
  Destinations,
  DiscoverHome,
  Footer,
  Header,
  StayCategories,
  StaySearchBar,
  SubscribeBox,
  TopOffers,
  TrendingDestinations,
} from '@/containers';

const HomePage = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-36">
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
