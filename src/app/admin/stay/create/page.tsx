'use client';

import { CreateStayStep1, CreateStayStep2 } from '@/components';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const CreateStayPage = () => {
  const [step, setStep] = useState<number>(1);
  const { control, watch, reset, trigger, handleSubmit } = useForm();
  return (
    <form>
      {step === 1 ? <CreateStayStep1 control={control} setStep={setStep} /> : null}
      {step === 2 ? <CreateStayStep2 control={control} setStep={setStep} /> : null}
    </form>
  );
};

export default CreateStayPage;
