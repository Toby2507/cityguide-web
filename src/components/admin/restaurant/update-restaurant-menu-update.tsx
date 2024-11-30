'use client';

import { AddMenuItemInput, addMenuItemSchema } from '@/schemas';
import { updateMenuItem } from '@/server';
import { IMenu } from '@/types';
import { getObjDiff } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import MenuInputs from './menu-inputs';

interface Props {
  menuItem: IMenu;
  resId: string;
  onClose: () => void;
}

const UpdateRestaurantMenuUpdate = ({ menuItem, resId, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const method = useForm<AddMenuItemInput>({
    defaultValues: { menu: [menuItem] },
    mode: 'onChange',
    resolver: zodResolver(addMenuItemSchema),
  });
  const { handleSubmit, reset } = method;

  const onSubmit: SubmitHandler<AddMenuItemInput> = async (data) => {
    setIsLoading(true);
    try {
      const diff = getObjDiff(data, { menu: [menuItem] });
      if (!Object.keys(diff).length) {
        onClose();
        return toast.error('No change has been made!');
      }
      await updateMenuItem(data.menu[0], resId);
      onClose();
      reset();
      toast.success('Accommodation updated successfully!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FormProvider {...method}>
      <div className="flex flex-col gap-2">
        <MenuInputs idx={0} isUploading={isUploading} setIsUploading={setIsUploading} />
        <Button
          className="text-sm font-semibold px-14 py-6 my-6"
          color="primary"
          radius="full"
          onPress={() => handleSubmit(onSubmit)()}
          isDisabled={isUploading}
          isLoading={isLoading}
        >
          Update Menu Item
        </Button>
      </div>
    </FormProvider>
  );
};

export default UpdateRestaurantMenuUpdate;
