'use client';

import {
  CreatePropertyAddress,
  CreatePropertyImageUpload,
  CreateRestaurantReview,
  CreateRestaurantStep1,
  CreateRestaurantStep3,
  CreateRestaurantStep4,
  CreateRestaurantStep6,
  CreateRestaurantStep7,
  CreateRestaurantStep8,
} from '@/components';
import { useStepManagement } from '@/hooks';
import { usePropertyStore } from '@/providers';
import { ICreateRestaurant, PropertyType } from '@/types';
import { Pagination } from '@nextui-org/react';
import { useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const CreateRestaurantPage = () => {
  const { setRestaurant, restaurant } = usePropertyStore();
  const { step, topStep, setStep } = useStepManagement(setRestaurant, restaurant);
  const methods = useForm<ICreateRestaurant>();
  const initialRender = useRef<boolean>(true);

  useEffect(() => {
    if (restaurant?.property && initialRender.current) {
      methods.reset(restaurant.property);
      initialRender.current = false;
    }
  }, [restaurant?.property, methods]);
  return (
    <FormProvider {...methods}>
      {step === 1 ? <CreateRestaurantStep1 setStep={setStep} /> : null}
      {step === 2 ? (
        <CreatePropertyAddress
          mainText="restaurant"
          subText="diners"
          setStep={setStep}
          type={PropertyType.RESTAURANT}
        />
      ) : null}
      {step === 3 ? <CreateRestaurantStep3 setStep={setStep} /> : null}
      {step === 4 ? <CreateRestaurantStep4 setStep={setStep} /> : null}
      {step === 5 ? (
        <CreatePropertyImageUpload name="Restaurant" nextStep={6} setStep={setStep} type={PropertyType.RESTAURANT} />
      ) : null}
      {step === 6 ? <CreateRestaurantStep6 setStep={setStep} /> : null}
      {step === 7 ? <CreateRestaurantStep7 setStep={setStep} /> : null}
      {step === 8 ? <CreateRestaurantStep8 setStep={setStep} /> : null}
      {step === 9 ? <CreateRestaurantReview setStep={setStep} /> : null}
      <div className="absolute bottom-10 flex flex-col gap-2">
        <p className="text-xs">Go to step</p>
        <Pagination className="z-100" total={topStep} page={step} onChange={(val) => setStep(val)} />
      </div>
    </FormProvider>
  );
};

export default CreateRestaurantPage;
