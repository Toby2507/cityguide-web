'use client';

import { staticAmenities } from '@/data';
import { updateStay } from '@/server';
import { IStay, IUpdateStay } from '@/types';
import { getObjDiff } from '@/utils';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import CreatePropertyAmenities from '../common/create-property-amenities';

interface Props {
  stay: IStay;
  onClose: () => void;
}

const UpdateStayAmenities = ({ stay, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const method = useForm<IUpdateStay>({ defaultValues: stay, mode: 'onChange' });
  const { handleSubmit, reset } = method;

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
    <FormProvider {...method}>
      <div className="flex flex-col gap-6 p-2">
        <h3 className="text-2xl text-center font-semibold tracking-wide border-b py-2">Update Stay Amenities</h3>
        <CreatePropertyAmenities data={staticAmenities} name="amenities" />
        <Button
          className="text-sm font-semibold px-14 py-6 my-6"
          color="primary"
          radius="full"
          onPress={() => handleSubmit(onSubmit)()}
          isLoading={isLoading}
        >
          Update Accommodation
        </Button>
      </div>
    </FormProvider>
  );
};

export default UpdateStayAmenities;
