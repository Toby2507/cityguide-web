import { Destinations, DiscoverHome, Footer, HomeHeader, StaySearchBar, SubscribeBox } from '@/containers';

const AirtimePage = () => {
  return (
    <>
      <HomeHeader />
      <main className="flex flex-col gap-14 bg-white">
        <div className="container mx-auto px-10 flex flex-col gap-10 max-w-7xl">
          <StaySearchBar extraClass="-mt-9" isMain />
        </div>
        <DiscoverHome />
        <div className="container mx-auto px-10 flex flex-col gap-10 max-w-7xl">
          <Destinations />
        </div>
        <SubscribeBox />
      </main>
      <Footer />
    </>
  );
};

export default AirtimePage;
