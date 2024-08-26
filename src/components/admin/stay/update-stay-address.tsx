'use client';

import { Map } from '@/components';
import { updateStay } from '@/server';
import { IStay, IUpdateStay } from '@/types';
import { getObjDiff } from '@/utils';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { SubmitHandler, useController, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Props {
  stay: IStay;
  onClose: () => void;
}

const UpdateStayAddress = ({ stay, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { control, handleSubmit, reset } = useForm<IUpdateStay>({ defaultValues: stay, mode: 'onChange' });
  const {
    field: { onChange, value },
  } = useController({ control, name: 'address' });

  const onSubmit: SubmitHandler<IUpdateStay> = async (data) => {
    setIsLoading(true);
    try {
      const updateBody = getObjDiff(data, stay);
      delete updateBody.updatedAt;
      if (!Object.keys(updateBody).length) {
        onClose();
        return toast.error('No change has been made!');
      }
      await updateStay(updateBody, stay._id);
      onClose();
      reset();
      toast.success('Stay rules updated successfully!');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-6 p-2">
      <h3 className="text-2xl text-center font-semibold tracking-wide border-b py-2">Update Stay Address</h3>
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

export default UpdateStayAddress;
