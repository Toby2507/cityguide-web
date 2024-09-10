import { ErrorDisplay, RestaurantCard } from '@/components';
import { getPartnerRestaurants, getUser } from '@/server';
import { EntityType } from '@/types';
import { paths } from '@/utils';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { redirect, RedirectType } from 'next/navigation';
import { FiPlus } from 'react-icons/fi';

const AdminRestaurantListPage = async () => {
  try {
    const user = await getUser();
    if (user?.type !== EntityType.ESTABLISHMENT) redirect(paths.admin(), RedirectType.replace);
    const restaurants = await getPartnerRestaurants();
    return (
      <section className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-20">
            <h2 className="text-xl font-semibold">Restaurant Properties</h2>
            <Link href={paths.createRestaurant()}>
              <Button className="text-primary text-sm font-semibold" color="secondary" radius="full" size="sm">
                <FiPlus />
                Add New
              </Button>
            </Link>
          </div>
        </div>
        <div className="grid items-center px-2 py-6 gap-10 min-w-0 max-w-full">
          {restaurants?.length ? (
            restaurants.map((restaurant) => <RestaurantCard key={restaurant._id} {...restaurant} />)
          ) : (
            <div className="grid place-items-center h-[70vh]">
              <p className="text-2xl text-accentGray text-center font-medium">No restaurants available</p>
            </div>
          )}
        </div>
      </section>
    );
  } catch (err: any) {
    return <ErrorDisplay error={err.message} />;
  }
};

export default AdminRestaurantListPage;
