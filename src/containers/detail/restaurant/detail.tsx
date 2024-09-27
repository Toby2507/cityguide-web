'use client';

import { RestaurantDetailInfo } from '@/containers';
import { getRestaurantById } from '@/server';
import { PropertyType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import DetailPageAmenities from '../common/amenities';
import DetailPageOverview from '../common/overview';
import RestaurantDetailMenu from './menu';
import RestaurantDetailReserveBtn from './reserve-button';

interface Props {
  resId: string;
}

const RestaurantDetailContainer = ({ resId }: Props) => {
  const { data: restaurant, isPending } = useQuery({
    queryKey: ['restaurant', resId],
    queryFn: async () => await getRestaurantById(resId),
  });

  if (!restaurant || isPending) return null;
  return (
    <>
      <DetailPageOverview amenities={restaurant.details.amenities} propType={PropertyType.RESTAURANT} {...restaurant} />
      <DetailPageAmenities amenities={restaurant.details.amenities} {...restaurant} />
      <RestaurantDetailMenu menu={restaurant.menu} />
      <RestaurantDetailInfo restaurant={restaurant} />
      {restaurant.details.reservation ? <RestaurantDetailReserveBtn restaurant={restaurant} /> : null}
    </>
  );
};

export default RestaurantDetailContainer;
