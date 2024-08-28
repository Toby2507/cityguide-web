'use client';

import { IRestaurant } from '@/types';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import UpdateRestaurantMenuList from './update-restaurant-menu-list';

interface Props {
  restaurant: IRestaurant;
  onClose: () => void;
}
type modalState = 'list' | 'update' | 'create';

const UpdateRestaurantMenu = ({ restaurant, onClose }: Props) => {
  const [modalState, setModalState] = useState<modalState>('list');
  const [menuId, setMenuId] = useState<string>('');
  const activeMenuItem = restaurant.menu.find((m) => m.id === menuId);

  const updateMenuItem = (id: string) => {
    setModalState('update');
    setMenuId(id);
  };
  return (
    <div className="flex flex-col gap-6 p-2">
      <header className="flex items-center justify-between gap-4 border-b py-2">
        <h3 className="text-2xl text-center font-semibold tracking-wide">Update Restaurant Menu</h3>
        {modalState === 'list' ? (
          <Button
            color="primary"
            className="font-semibold"
            radius="sm"
            startContent={<IoAdd className="text-lg" />}
            variant="flat"
            onPress={() => setModalState('create')}
          >
            Add New Menu Item
          </Button>
        ) : null}
      </header>
      {modalState === 'list' ? <UpdateRestaurantMenuList onUpdate={updateMenuItem} restaurant={restaurant} /> : null}
    </div>
  );
};

export default UpdateRestaurantMenu;
