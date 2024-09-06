'use client';

import { Map } from '@/components';
import { updateNightlife, updateRestaurant, updateStay } from '@/server';
import {
  INightLife,
  IRestaurant,
  IStay,
  IUpdateNightlife,
  IUpdateRestaurant,
  IUpdateStay,
  PropertyType,
} from '@/types';
import { getObjDiff } from '@/utils';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Props {
  property: IStay | IRestaurant | INightLife;
  type: PropertyType;
  onClose: () => void;
}

const UpdatePropertyAddress = ({ property, type, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { control, handleSubmit, reset } = useForm<IUpdateStay | IUpdateRestaurant | IUpdateNightlife>({
    defaultValues: property,
    mode: 'onChange',
  });
  const {
    field: { onChange, value },
  } = useController({ control, name: 'address' });

  const onSubmit: SubmitHandler<IUpdateStay | IUpdateRestaurant | IUpdateNightlife> = async (data) => {
    setIsLoading(true);
    try {
      const updateBody = getObjDiff(data, property);
      delete updateBody.updatedAt;
      if (!Object.keys(updateBody).length) {
        onClose();
        return toast.error('No change has been made!');
      }
      if (type === PropertyType.STAY) await updateStay(updateBody, property._id);
      else if (type === PropertyType.RESTAURANT) await updateRestaurant(updateBody, property._id);
      else await updateNightlife(updateBody, property._id);
      onClose();
      reset();
      toast.success('Propery address updated successfully!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-6 p-2">
      <h3 className="text-2xl text-center font-semibold tracking-wide border-b py-2">Update Property Address</h3>
      <Map prevAddr={value || null} customClass="h-[65vh]" setAddr={(addr) => onChange(addr)} />
      <Button
        className="text-sm font-semibold px-14 py-6 my-2"
        color="primary"
        radius="full"
        onPress={() => handleSubmit(onSubmit)()}
        isLoading={isLoading}
      >
        Update Address
      </Button>
    </div>
  );
};

export default UpdatePropertyAddress;
