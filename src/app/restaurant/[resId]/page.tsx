import {
  DetailPageAmenities,
  DetailPageOverview,
  Footer,
  Header,
  RestaurantDetailInfo,
  RestaurantDetailMenu,
  SubscribeBox,
} from '@/containers';
import { getRestaurantById } from '@/server';

interface Props {
  params: {
    resId: string;
  };
}

const RestaurantDetailPage = async ({ params: { resId } }: Props) => {
  const restaurant = await getRestaurantById(resId);
  if (!restaurant) return null;
  return (
    <>
      <Header />
      <main className="flex flex-col gap-20 bg-white">
        <div className="container mx-auto px-10 flex flex-col gap-6 max-w-7xl">
          <DetailPageOverview amenities={restaurant.details.amenities} {...restaurant} />
          <DetailPageAmenities amenities={restaurant.details.amenities} {...restaurant} />
          <RestaurantDetailMenu menu={restaurant.menu} />
          <RestaurantDetailInfo restaurant={restaurant} />
        </div>
        <SubscribeBox />
      </main>
      <Footer />
    </>
  );
};

export default RestaurantDetailPage;
