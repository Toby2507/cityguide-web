'use client';

import {
  CreatePropertyAddress,
  CreatePropertyImageUpload,
  CreateStayAccommodation,
  CreateStayReview,
  CreateStayStep1,
  CreateStayStep3,
  CreateStayStep4,
  CreateStayStep5,
  CreateStayStep7,
} from '@/components';
import { useStepManagement } from '@/hooks';
import { usePropertyStore } from '@/providers';
import { ICreateStay, PropertyType } from '@/types';
import { Pagination } from '@nextui-org/react';
import { useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const CreateStayPage = () => {
  const { setStay, stay } = usePropertyStore();
  const { step, topStep, setStep } = useStepManagement(setStay, stay);
  const methods = useForm<ICreateStay>();
  const initialRender = useRef<boolean>(true);

  useEffect(() => {
    if (stay?.property && initialRender.current) {
      methods.reset(stay.property);
      initialRender.current = false;
    }
  }, [stay?.property, methods]);
  return (
    <FormProvider {...methods}>
      {step === 1 ? <CreateStayStep1 setStep={setStep} /> : null}
      {step === 2 ? <CreatePropertyAddress setStep={setStep} type={PropertyType.STAY} /> : null}
      {step === 3 ? <CreateStayStep3 setStep={setStep} /> : null}
      {step === 4 ? <CreateStayStep4 setStep={setStep} /> : null}
      {step === 5 ? <CreateStayStep5 setStep={setStep} /> : null}
      {step === 6 ? <CreatePropertyImageUpload nextStep={7} setStep={setStep} type={PropertyType.STAY} /> : null}
      {step === 7 ? <CreateStayStep7 setStep={setStep} /> : null}
      {step === 8 ? <CreateStayAccommodation setStep={setStep} /> : null}
      {step === 9 ? <CreateStayReview setStep={setStep} /> : null}
      <div className="absolute bottom-10 flex flex-col gap-2">
        <p className="text-xs">Go to step</p>
        <Pagination className="z-[999999]" total={topStep} page={step} onChange={setStep} />
      </div>
    </FormProvider>
  );
};

export default CreateStayPage;
