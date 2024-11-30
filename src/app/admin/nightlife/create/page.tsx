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
import { useStepManagement } from '@/hooks';
import { usePropertyStore } from '@/providers';
import { CreateNightlifeInput, createNightlifeSchema } from '@/schemas';
import { PropertyType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pagination } from '@nextui-org/react';
import { useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const CreateNightlifePage = () => {
  const { setNightlife, nightlife } = usePropertyStore();
  const { step, topStep, setStep } = useStepManagement(setNightlife, nightlife);
  const methods = useForm<CreateNightlifeInput>({ mode: 'onChange', resolver: zodResolver(createNightlifeSchema) });
  const initialRender = useRef<boolean>(true);

  useEffect(() => {
    if (nightlife?.property && initialRender.current) {
      methods.reset(nightlife.property);
      initialRender.current;
    }
  }, [nightlife?.property, methods]);
  return (
    <FormProvider {...methods}>
      {step === 1 ? <CreateNightlifeStep1 setStep={setStep} /> : null}
      {step === 2 ? <CreatePropertyAddress setStep={setStep} type={PropertyType.NIGHTLIFE} /> : null}
      {step === 3 ? <CreateNightlifeStep3 setStep={setStep} /> : null}
      {step === 4 ? <CreateNightlifeStep4 setStep={setStep} /> : null}
      {step === 5 ? (
        <CreatePropertyImageUpload name="Nightlife" nextStep={6} setStep={setStep} type={PropertyType.NIGHTLIFE} />
      ) : null}
      {step === 6 ? <CreateNightlifeStep6 setStep={setStep} /> : null}
      {step === 7 ? <CreateNightlifeStep7 setStep={setStep} /> : null}
      {step === 8 ? <CreateNightlifeReview setStep={setStep} /> : null}
      <div className="absolute bottom-10 flex flex-col gap-2 z-[99999]">
        <p className="text-xs bg-white rounded-lg p-2 w-fit">Go to step</p>
        <Pagination total={topStep} page={step} onChange={setStep} />
      </div>
    </FormProvider>
  );
};

export default CreateNightlifePage;
