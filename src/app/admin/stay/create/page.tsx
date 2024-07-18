'use client';

import {
  CreateStayStep1,
  CreateStayStep2,
  CreateStayStep3,
  CreateStayStep4,
  CreateStayStep5,
  CreateStayStep6,
} from '@/components';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const CreateStayPage = () => {
  const [step, setStep] = useState<number>(1);
  const { control, watch, reset, trigger, setFocus, handleSubmit } = useForm();
  return (
    <div>
      {step === 1 ? <CreateStayStep1 control={control} setStep={setStep} /> : null}
      {step === 2 ? <CreateStayStep2 control={control} setStep={setStep} /> : null}
      {step === 3 ? (
        <CreateStayStep3 control={control} trigger={trigger} watch={watch} setFocus={setFocus} setStep={setStep} />
      ) : null}
      {step === 4 ? <CreateStayStep4 control={control} setFocus={setFocus} setStep={setStep} /> : null}
      {step === 5 ? <CreateStayStep5 control={control} setStep={setStep} /> : null}
      {step === 6 ? <CreateStayStep6 control={control} setStep={setStep} /> : null}
    </div>
  );
};

export default CreateStayPage;
