'use client';

import { nightlifeAmenities } from '@/data';
import { usePropertyStore } from '@/providers';
import { CreateNightlifeInput, createNightlifeSchema } from '@/schemas';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import CreateNavButtons from '../common/create-nav-buttons';
import CreatePropertyAmenities from '../common/create-property-amenities';

interface Props {
  setStep: (newStep: number) => void;
}

const CreateNightlifeStep4 = ({ setStep }: Props) => {
  const { watch } = useFormContext<CreateNightlifeInput>();
  const { setNightlife } = usePropertyStore();
  const [isLoading, setisLoading] = useState<boolean>(false);

  const handleNext = async () => {
    setisLoading(true);
    const amenities = watch('details.amenities') || [];
    const isValid = await createNightlifeSchema.shape.details.shape.amenities.safeParseAsync(amenities);
    setisLoading(false);
    if (!isValid.success) return toast.error(isValid.error.flatten().formErrors.join(', '));
    setStep(5);
    setNightlife({ property: watch() });
  };
  return (
    <div className="flex flex-col justify-center gap-4 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Available Amenities</h1>
        <p className="text-center font-light">
          What makes your nightlife special? Highlight your amenities to attract guests on Cityguidex.
        </p>
      </div>
      <CreatePropertyAmenities data={nightlifeAmenities} name="details.amenities" />
      <CreateNavButtons isLoading={isLoading} previous={() => setStep(3)} next={handleNext} />
    </div>
  );
};

export default CreateNightlifeStep4;
