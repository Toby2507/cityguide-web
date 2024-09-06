import { AdminRestaurantDetail } from '@/containers';
import { getRestaurantById } from '@/server';
import toast from 'react-hot-toast';

interface Props {
  params: {
    restaurantId: string;
  };
}

const AdminRestaurantDetailPage = async ({ params: { restaurantId } }: Props) => {
  try {
    const restaurant = await getRestaurantById(restaurantId);
    if (!restaurant) return null;
    return <AdminRestaurantDetail restaurant={restaurant} />;
  } catch (err: any) {
    toast.error(err.message);
    return null;
  }
};

export default AdminRestaurantDetailPage;
