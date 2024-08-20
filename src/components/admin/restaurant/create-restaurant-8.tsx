'use client';

import { createRestaurantSchema } from '@/schemas';
import { ICreateRestaurant } from '@/types';
import { Button, Pagination } from '@nextui-org/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoAdd, IoRemove } from 'react-icons/io5';
import CreateNavButtons from '../common/create-nav-buttons';
import MenuInputs from './menu-inputs';

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}

const CreateRestaurantStep8 = ({ setStep }: Props) => {
  const { control, trigger, watch } = useFormContext<ICreateRestaurant>();
  const [menuIdx, setMenuIdx] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(1);
  const { remove } = useFieldArray({ control, name: 'menu' });

  const addMenu = () => {
    setTotal(total + 1);
    setMenuIdx(menuIdx + 1);
  };
  const removeMenu = () => {
    remove(menuIdx);
    setTotal(total - 1);
    setMenuIdx(menuIdx - 1);
  };
  const handleNext = async () => {
    setIsLoading(true);
    const [isValidT, isValidS] = await Promise.all([
      trigger('menu'),
      createRestaurantSchema.shape.menu.safeParseAsync(watch('menu')),
    ]);
    setIsLoading(false);
    if (!isValidT) return toast.error('Please fill all the required fields');
    if (!isValidS.success) return toast.error('Please fill all the required fields in all menu items');
    setStep(9);
  };
  return (
    <div className="flex flex-col justify-center gap-4 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Add Menu</h1>
        <p className="text-center font-light">Expand your offerings with diverse menu</p>
      </div>
      <div className="flex flex-col gap-4 max-w-3xl py-2 mx-auto w-full">
        <MenuInputs key={menuIdx} idx={menuIdx} />
        <div className="flex items-center justify-between gap-10">
          <Pagination total={total} page={menuIdx + 1} onChange={(val) => setMenuIdx(val - 1)} />
          <div className="flex items-center gap-2">
            <Button
              className="text-xs font-medium pr-4"
              color="primary"
              radius="full"
              size="sm"
              variant="flat"
              onPress={addMenu}
              isLoading={isLoading}
              startContent={<IoAdd className="text-lg" />}
            >
              New
            </Button>
            {menuIdx ? (
              <Button
                className="text-xs font-medium pr-4"
                color="danger"
                radius="full"
                size="sm"
                variant="flat"
                onPress={removeMenu}
                isLoading={isLoading}
                startContent={<IoRemove className="text-lg" />}
              >
                Remove
              </Button>
            ) : null}
          </div>
        </div>
        <CreateNavButtons isLoading={isLoading} previous={() => setStep(7)} next={handleNext} />
      </div>
    </div>
  );
};

export default CreateRestaurantStep8;
