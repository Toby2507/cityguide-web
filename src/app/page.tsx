import { Header, StaySearchBar, TopOffers, TrendingDestinations } from '@/containers';

const HomePage = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-10 flex flex-col gap-14 pb-10 max-w-7xl">
        <div className="relative flex items-center gap-2 bg-accentLightBlue px-3 py-2 rounded-xl -mt-8 mx-auto w-full">
          <StaySearchBar />
        </div>
        <TopOffers />
        <TrendingDestinations />
      </main>
    </>
  );
};

export default HomePage;
