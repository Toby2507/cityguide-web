'use client';

import { createNightlifeSchema } from '@/schemas';
import { ICreateNightlife } from '@/types';
import { onEnter } from '@/utils';
import { Input, Textarea } from '@nextui-org/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import CreateNavButtons from '../common/create-nav-buttons';

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}

const CreateNightlifeStep3 = ({ setStep }: Props) => {
  const { control, trigger, setFocus } = useFormContext<ICreateNightlife>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNext = async () => {
    setIsLoading(true);
    const isValid = await trigger(['name', 'summary']);
    setIsLoading(false);
    if (!isValid) return toast.error('Please fill in the required fields');
    setStep(4);
  };

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);
  return (
    <div className="flex flex-col justify-center gap-4 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Basic Property Information</h1>
        <p className="text-center font-light">
          Tell us about your space! Fill in the details to showcase your Cityguidex listing.
        </p>
      </div>
      <div className="flex flex-col gap-4 max-w-3xl py-2 mx-auto w-full">
        <Controller
          control={control}
          render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
            <Input
              name="name"
              label="Property Name"
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
          rules={{
            validate: (val) => {
              const isValid = createNightlifeSchema.shape.name.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
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
          rules={{
            validate: (val) => {
              const isValid = createNightlifeSchema.shape.summary.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
        />
        <CreateNavButtons isLoading={isLoading} previous={() => setStep(2)} next={handleNext} />
      </div>
    </div>
  );
};

export default CreateNightlifeStep3;
