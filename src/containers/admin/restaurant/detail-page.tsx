'use client';

import { DetailPageAmenities, DetailPageOverview, RestaurantDetailInfo, RestaurantDetailMenu } from '@/containers';
import { IRestaurant } from '@/types';

interface Props {
  restaurant: IRestaurant;
}

const AdminRestaurantDetailPage = ({ restaurant }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-4 max-w-7xl pt-14 pb-6 mx-auto w-full">
        <DetailPageOverview {...restaurant} amenities={restaurant.details.amenities} />
        <DetailPageAmenities amenities={restaurant.details.amenities} name={restaurant.name} />
        <RestaurantDetailMenu menu={restaurant.menu} />
        <RestaurantDetailInfo {...restaurant} />
      </div>
    </>
  );
};

export default AdminRestaurantDetailPage;
