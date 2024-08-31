import {
  Destinations,
  DiscoverHome,
  Footer,
  HomeHeader,
  RestaurantTrendingDestinations,
  StaySearchBar,
  SubscribeBox,
  TopOffers,
} from '@/containers';

const RestaurantHomePage = () => {
  return (
    <>
      <HomeHeader />
      <main className="flex flex-col gap-36 bg-white">
        <div className="container mx-auto px-10 flex flex-col gap-20 max-w-7xl">
          <StaySearchBar extraClass="-mt-9" isMain />
          <TopOffers />
          <RestaurantTrendingDestinations />
        </div>
        <DiscoverHome />
        <div className="container mx-auto px-10 flex flex-col gap-20 max-w-7xl">
          <Destinations />
        </div>
        <SubscribeBox />
      </main>
      <Footer />
    </>
  );
};

export default RestaurantHomePage;
