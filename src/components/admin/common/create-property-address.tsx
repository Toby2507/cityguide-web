'use client';

import { CreateNavButtons, Map } from '@/components';
import { usePropertyStore } from '@/providers';
import { createRestaurantSchema } from '@/schemas';
import { PropertyType } from '@/types';
import { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Props {
  mainText?: string;
  subText?: string;
  type: PropertyType;
  setStep: (newStep: number) => void;
}

const CreatePropertyAddress = ({ mainText, subText, type, setStep }: Props) => {
  const { control, watch } = useFormContext();
  const { setStay, setRestaurant, setNightlife } = usePropertyStore();
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
    if (type === PropertyType.STAY) setStay({ property: watch() });
    if (type === PropertyType.RESTAURANT) setRestaurant({ property: watch() });
    if (type === PropertyType.NIGHTLIFE) setNightlife({ property: watch() });
  };

  return (
    <div className="flex flex-col justify-center gap-4 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Where is your {mainText || 'property'} located?</h1>
        <p className="text-center font-light">
          Unlock potential {subText || 'guests'}! Pinpoint your {mainText || 'property'}&apos;s address
        </p>
      </div>
      <div className="w-10/12 mx-auto">
        <Map prevAddr={value} customClass="h-[65vh]" setAddr={(addr) => onChange(addr)} />
      </div>
      <CreateNavButtons isLoading={isLoading} previous={() => setStep(1)} next={handleNext} />
    </div>
  );
};

export default CreatePropertyAddress;
