'use client';

import { CreatePropertyAmenities } from '@/components';
import { stayAmenities } from '@/data';
import { usePropertyStore } from '@/providers';
import { CreateStayInput, createStaySchema } from '@/schemas';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import CreateNavButtons from '../common/create-nav-buttons';

interface Props {
  setStep: (newStep: number) => void;
}

const CreateStayStep4 = ({ setStep }: Props) => {
  const { watch } = useFormContext<CreateStayInput>();
  const { setStay } = usePropertyStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNext = async () => {
    setIsLoading(true);
    const amenities = watch('amenities') || [];
    const isValid = await createStaySchema.shape.amenities.safeParseAsync(amenities);
    setIsLoading(false);
    if (!isValid.success) return toast.error(isValid.error.flatten().formErrors.join(', '));
    setStep(5);
    setStay({ property: watch() });
  };
  return (
    <div className="flex flex-col justify-center gap-4 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Available Amenities</h1>
        <p className="text-center font-light">
          What makes your place special? Highlight your amenities to attract guests on Cityguidex.
        </p>
      </div>
      <CreatePropertyAmenities data={stayAmenities} name="amenities" />
      <CreateNavButtons isLoading={isLoading} previous={() => setStep(4)} next={handleNext} />
    </div>
  );
};

export default CreateStayStep4;
