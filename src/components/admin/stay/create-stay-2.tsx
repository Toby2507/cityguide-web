'use client';

import { Map } from '@/components';
import { createStaySchema } from '@/schemas';
import { ICreateStay } from '@/types';
import { Dispatch, SetStateAction, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import CreateStayButtons from './create-stay-btns';

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}

const CreateStayStep2 = ({ setStep }: Props) => {
  const { control } = useFormContext<ICreateStay>();
  const {
    field: { onChange, value },
  } = useController({ control, name: 'address' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleNext = async () => {
    // setIsLoading(true);
    // const isValid = await createStaySchema.shape.address.safeParseAsync(value);
    // setIsLoading(false);
    // if (!isValid.success) return toast.error('Please select a valid address');
    setStep(3);
  };

  return (
    <div className="flex flex-col justify-center gap-4 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Where is your property located?</h1>
        <p className="text-center font-light">Unlock potential guests! Pinpoint your property&apos;s address</p>
      </div>
      <div className="w-10/12 mx-auto">
        <Map prevAddr={value} customClass="h-[65vh]" setAddr={(addr) => onChange(addr)} />
      </div>
      <CreateStayButtons isLoading={isLoading} previous={() => setStep(1)} next={handleNext} />
    </div>
  );
};

export default CreateStayStep2;
