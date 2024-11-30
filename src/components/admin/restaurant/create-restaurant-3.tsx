'use client';

import { CreateNavButtons } from '@/components';
import { usePropertyStore } from '@/providers';
import { CreateRestaurantInput } from '@/schemas';
import { onEnter } from '@/utils';
import { Input, Textarea } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Props {
  setStep: (newStep: number) => void;
}

const CreateRestaurantStep3 = ({ setStep }: Props) => {
  const { control, setFocus, trigger, watch } = useFormContext<CreateRestaurantInput>();
  const { setRestaurant } = usePropertyStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNext = async () => {
    setIsLoading(true);
    const isValid = await trigger(['name', 'summary']);
    setIsLoading(false);
    if (!isValid) return toast.error('Please fill in the required fields');
    setStep(4);
    setRestaurant({ property: watch() });
  };

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);
  return (
    <div className="flex flex-col justify-center gap-4 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Basic Restaurant Information</h1>
        <p className="text-center font-light">
          Tell us about your restaurant! Fill in the details to showcase your Cityguidex listing.
        </p>
      </div>
      <div className="flex flex-col gap-4 max-w-3xl py-2 mx-auto w-full">
        <Controller
          control={control}
          render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
            <Input
              name="name"
              label="Restaurant Name"
              labelPlacement="outside"
              placeholder=" "
              radius="full"
              isRequired
              value={value}
              onChange={onChange}
              onKeyDown={(e) => onEnter(e, () => setFocus('summary'))}
              isInvalid={!!error}
              errorMessage={error?.message}
              ref={ref}
              className="text-accentGray"
            />
          )}
          name="name"
        />
        <Controller
          control={control}
          render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
            <Textarea
              name="summary"
              label="Property Summary"
              labelPlacement="outside"
              placeholder=" "
              radius="full"
              isRequired
              value={value}
              onChange={onChange}
              isInvalid={!!error}
              errorMessage={error?.message}
              ref={ref}
              className="text-accentGray"
            />
          )}
          name="summary"
        />
        <CreateNavButtons isLoading={isLoading} previous={() => setStep(1)} next={handleNext} />
      </div>
    </div>
  );
};

export default CreateRestaurantStep3;
