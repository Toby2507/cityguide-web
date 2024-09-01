import { Footer, Header, RestaurantSearch } from '@/containers';

interface Props {
  params: {
    searchparams?: string[];
  };
}

const RestaurantSearchPage = ({ params: { searchparams } }: Props) => {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-20 bg-white">
        <div className="container mx-auto px-10 flex flex-col gap-6 max-w-7xl">
          <RestaurantSearch searchParam={searchparams} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RestaurantSearchPage;
