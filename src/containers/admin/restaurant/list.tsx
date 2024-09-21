'use client';

import { RestaurantCard } from '@/components';
import { getPartnerRestaurants } from '@/server';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const AdminRestaurantList = () => {
  const {
    data: restaurants,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['restaurants', 'admin'],
    queryFn: getPartnerRestaurants,
  });

  if (isPending) return null;
  if (isError) return toast.error(error.message);
  return (
    <div className="grid items-center px-2 py-6 gap-10 min-w-0 max-w-full">
      {restaurants?.length ? (
        restaurants.map((restaurant) => <RestaurantCard key={restaurant._id} {...restaurant} />)
      ) : (
        <div className="grid place-items-center h-[70vh]">
          <p className="text-2xl text-accentGray text-center font-medium">No restaurants available</p>
        </div>
      )}
    </div>
  );
};

export default AdminRestaurantList;