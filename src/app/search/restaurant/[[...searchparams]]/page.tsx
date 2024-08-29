import { Footer, Header } from '@/containers';

interface Props {
  params: {
    searchparams?: string[];
  };
}

const RestaurantSearchPage = ({ params: { searchparams } }: Props) => {
  return (
    <>
      <Header />
      <main className="container flex flex-col gap-6 bg-white max-w-7xl px-10 mx-auto"></main>
      <Footer />
    </>
  );
};

export default RestaurantSearchPage;
