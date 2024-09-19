import { ErrorDisplay } from '@/components';
import { AdminRestaurantDetail } from '@/containers';
import { getRestaurantById } from '@/server';

interface Props {
  params: {
    restaurantId: string;
  };
}

const AdminRestaurantDetailPage = async ({ params: { restaurantId } }: Props) => {
  const restaurant = await getRestaurantById(restaurantId);
  if (!restaurant) return null;
  return <AdminRestaurantDetail restaurant={restaurant} />;
};

export default AdminRestaurantDetailPage;
