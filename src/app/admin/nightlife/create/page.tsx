'use client';

import {
  CreateNightlifeReview,
  CreateNightlifeStep1,
  CreateNightlifeStep3,
  CreateNightlifeStep4,
  CreateNightlifeStep6,
  CreateNightlifeStep7,
  CreatePropertyAddress,
  CreatePropertyImageUpload,
} from '@/components';
import { ICreateNightlife } from '@/types';
import { Pagination } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const CreateNightlifePage = () => {
  const [step, setStep] = useState<number>(1);
  const [topStep, setTopStep] = useState<number>(1);
  const methods = useForm<ICreateNightlife>();

  useEffect(() => {
    setTopStep((prev) => Math.max(prev, step));
  }, [step]);
  return (
    <FormProvider {...methods}>
      {step === 1 ? <CreateNightlifeStep1 setStep={setStep} /> : null}
      {step === 2 ? <CreatePropertyAddress setStep={setStep} /> : null}
      {step === 3 ? <CreateNightlifeStep3 setStep={setStep} /> : null}
      {step === 4 ? <CreateNightlifeStep4 setStep={setStep} /> : null}
      {step === 5 ? <CreatePropertyImageUpload name="Nightlife" nextStep={6} setStep={setStep} /> : null}
      {step === 6 ? <CreateNightlifeStep6 setStep={setStep} /> : null}
      {step === 7 ? <CreateNightlifeStep7 setStep={setStep} /> : null}
      {step === 8 ? <CreateNightlifeReview setStep={setStep} /> : null}
      <div className="absolute bottom-10 flex flex-col gap-2">
        <p className="text-xs">Go to step</p>
        <Pagination className="z-50" total={topStep} page={step} onChange={(val) => setStep(val)} />
      </div>
    </FormProvider>
  );
};

export default CreateNightlifePage;
