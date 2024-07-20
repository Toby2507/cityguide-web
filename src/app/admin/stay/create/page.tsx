'use client';

import {
  CreateStayAccommodation,
  CreateStayStep1,
  CreateStayStep2,
  CreateStayStep3,
  CreateStayStep4,
  CreateStayStep5,
  CreateStayStep6,
  CreateStayStep7,
} from '@/components';
import { ICreateStay } from '@/types';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const CreateStayPage = () => {
  const [step, setStep] = useState<number>(1);
  const methods = useForm<ICreateStay>();
  return (
    <FormProvider {...methods}>
      {step === 1 ? <CreateStayStep1 setStep={setStep} /> : null}
      {step === 2 ? <CreateStayStep2 setStep={setStep} /> : null}
      {step === 3 ? <CreateStayStep3 setStep={setStep} /> : null}
      {step === 4 ? <CreateStayStep4 setStep={setStep} /> : null}
      {step === 5 ? <CreateStayStep5 setStep={setStep} /> : null}
      {step === 6 ? <CreateStayStep6 setStep={setStep} /> : null}
      {step === 7 ? <CreateStayStep7 setStep={setStep} /> : null}
      {step === 8 ? <CreateStayAccommodation setStep={setStep} /> : null}
    </FormProvider>
  );
};

export default CreateStayPage;
