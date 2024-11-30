'use client';

import { AddMenuItemInput, addMenuItemSchema } from '@/schemas';
import { addMenuItem } from '@/server';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Pagination } from '@nextui-org/react';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoAdd, IoRemove } from 'react-icons/io5';
import MenuInputs from './menu-inputs';

interface Props {
  resId: string;
  onClose: () => void;
}

const UpdateRestaurantMenuCreate = ({ resId, onClose }: Props) => {
  const method = useForm<AddMenuItemInput>({ mode: 'onChange', resolver: zodResolver(addMenuItemSchema) });
  const { control, handleSubmit, reset, trigger } = method;
  const [menuIdx, setMenuIdx] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
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
  const onSubmit: SubmitHandler<AddMenuItemInput> = async (data) => {
    setIsLoading(true);
    try {
      const [isValidT, isValidS] = await Promise.all([
        trigger('menu'),
        addMenuItemSchema.shape.menu.safeParseAsync(data.menu),
      ]);
      if (!isValidT) return toast.error('Please fill out the required fields');
      if (!isValidS.success) return toast.error('Please fill out the required fields in the other accommodations');
      await addMenuItem(data.menu, resId);
      onClose();
      reset();
      toast.success('Accommodation(s) added successfully!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FormProvider {...method}>
      <div className="flex flex-col gap-2">
        <MenuInputs key={menuIdx} idx={menuIdx} isUploading={isUploading} setIsUploading={setIsUploading} />
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
              isDisabled={isUploading}
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
                isDisabled={isUploading}
                isLoading={isLoading}
                startContent={<IoRemove className="text-lg" />}
              >
                Remove
              </Button>
            ) : null}
          </div>
        </div>
        <Button
          className="text-sm font-semibold px-14 py-6 my-6"
          color="primary"
          radius="full"
          onPress={() => handleSubmit(onSubmit)()}
          isDisabled={isUploading}
          isLoading={isLoading}
        >
          Add Accommodations
        </Button>
      </div>
    </FormProvider>
  );
};

export default UpdateRestaurantMenuCreate;
