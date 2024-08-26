'use client';

import { updateAccommodation } from '@/server';
import { IAccommodation, IAccommodationForm } from '@/types';
import { getObjDiff } from '@/utils';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import AccommodationInputs from './accommodation-inputs';

interface Props {
  accommodation: IAccommodation;
  stayId: string;
  onClose: () => void;
}

const UpdateStayAccommodationUpdate = ({ accommodation, onClose, stayId }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const method = useForm<IAccommodationForm>({ defaultValues: { accommodation: [accommodation] } });
  const { handleSubmit, reset } = method;

  const onSubmit: SubmitHandler<IAccommodationForm> = async (data) => {
    setIsLoading(true);
    try {
      const diff = getObjDiff(data, { accommodation: [accommodation] });
      if (!Object.keys(diff).length) {
        onClose();
        return toast.error('No change has been made!');
      }
      await updateAccommodation(data.accommodation[0], stayId);
      onClose();
      reset();
      toast.success('Accommodation updated successfully!');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FormProvider {...method}>
      <div className="flex flex-col gap-2">
        <AccommodationInputs idx={0} isUpdate />
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

export default UpdateStayAccommodationUpdate;
