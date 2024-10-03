import {
  Destinations,
  DiscoverHome,
  Footer,
  HomeHeader,
  RestaurantCategories,
  RestaurantSearchBar,
  RestaurantTrendingDestinations,
  TopOffers,
} from '@/containers';
import { getTrendingRestaurants } from '@/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const RestaurantHomePage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['trending-restaurants'],
    queryFn: getTrendingRestaurants,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeHeader />
      <main className="flex flex-col gap-14 bg-white">
        <div className="container mx-auto px-10 flex flex-col gap-10 max-w-7xl">
          <RestaurantSearchBar extraClass="-mt-9" isMain />
          <TopOffers />
          <RestaurantTrendingDestinations />
        </div>
        <DiscoverHome />
        <div className="container mx-auto px-10 flex flex-col gap-10 max-w-7xl">
          <RestaurantCategories />
          <Destinations />
        </div>
      </main>
      <Footer />
    </HydrationBoundary>
  );
};

export default RestaurantHomePage;
