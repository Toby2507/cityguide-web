import { IRestaurant } from '@/types';

interface Props {
  restaurant: IRestaurant;
  onClose: () => void;
}

const UpdateRestaurantInfo = ({ restaurant, onClose }: Props) => {
  return <div>UpdateRestaurantInfo</div>;
};

export default UpdateRestaurantInfo;
