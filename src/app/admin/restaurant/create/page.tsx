'use client';

import { CreateRestaurantStep1 } from '@/components';
import { ICreateRestaurant } from '@/types';
import { Pagination } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const CreateRestaurantPage = () => {
  const [step, setStep] = useState<number>(1);
  const [topStep, setTopStep] = useState<number>(1);
  const methods = useForm<ICreateRestaurant>();

  useEffect(() => {
    setTopStep((prev) => Math.max(prev, step));
  }, [step]);
  return (
    <FormProvider {...methods}>
      {step === 1 ? <CreateRestaurantStep1 setStep={setStep} /> : null}
      <div className="absolute bottom-10 flex flex-col gap-2">
        <p className="text-xs">Go to step</p>
        <Pagination total={topStep} page={step} onChange={(val) => setStep(val)} />
      </div>
    </FormProvider>
  );
};

export default CreateRestaurantPage;
