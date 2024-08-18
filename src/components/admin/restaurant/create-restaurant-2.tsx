'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import CreateStayButtons from '../stay/create-stay-btns';
import { Map } from '@/components';
import { useController, useFormContext } from 'react-hook-form';
import { ICreateRestaurant } from '@/types';
import { createRestaurantSchema } from '@/schemas';
import toast from 'react-hot-toast';

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}

const CreateRestaurantStep2 = ({ setStep }: Props) => {
  const { control } = useFormContext<ICreateRestaurant>();
  const {
    field: { onChange, value },
  } = useController({ control, name: 'address' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleNext = async () => {
    setIsLoading(true);
    const isValid = await createRestaurantSchema.shape.address.safeParseAsync(value);
    setIsLoading(false);
    if (!isValid.success) return toast.error('Please select a valid address');
    setStep(3);
  };

  return (
    <div className="flex flex-col justify-center gap-4 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Where is your restaurant located?</h1>
        <p className="text-center font-light">Unlock potential diners! Pinpoint your restaurant&apos;s address</p>
      </div>
      <div className="w-10/12 mx-auto">
        <Map prevAddr={value} customClass="h-[65vh]" setAddr={(addr) => onChange(addr)} />
      </div>
      <CreateStayButtons isLoading={isLoading} previous={() => setStep(1)} next={handleNext} />
    </div>
  );
};

export default CreateRestaurantStep2;
