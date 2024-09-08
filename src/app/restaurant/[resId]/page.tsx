import { RestaurantDetailNav } from '@/components';
import {
  DetailPageAmenities,
  DetailPageOverview,
  Footer,
  Header,
  RestaurantDetailInfo,
  RestaurantDetailMenu,
  RestaurantDetailReserveBtn,
  SubscribeBox,
} from '@/containers';
import { getRestaurantById } from '@/server';
import { PropertyType } from '@/types';
import toast from 'react-hot-toast';

interface Props {
  params: {
    resId: string;
  };
}

const RestaurantDetailPage = async ({ params: { resId } }: Props) => {
  try {
    const restaurant = await getRestaurantById(resId);
    if (!restaurant) return null;
    return (
      <>
        <Header />
        <main className="flex flex-col gap-20 bg-white">
          <div className="container mx-auto px-10 flex flex-col gap-6 max-w-7xl">
            <RestaurantDetailNav />
            <DetailPageOverview
              amenities={restaurant.details.amenities}
              propType={PropertyType.RESTAURANT}
              {...restaurant}
            />
            <DetailPageAmenities amenities={restaurant.details.amenities} {...restaurant} />
            <RestaurantDetailMenu menu={restaurant.menu} />
            <RestaurantDetailInfo restaurant={restaurant} />
            {restaurant.details.reservation ? <RestaurantDetailReserveBtn restaurant={restaurant} /> : null}
          </div>
          <SubscribeBox />
        </main>
        <Footer />
      </>
    );
  } catch (err: any) {
    toast.error(err.message);
    return null;
  }
};

export default RestaurantDetailPage;
