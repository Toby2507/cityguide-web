'use client';

import { CreateNavButtons, CreatePropertyAmenities } from '@/components';
import { restaurantAmenities } from '@/data';
import { usePropertyStore } from '@/providers';
import { CreateRestaurantInput, createRestaurantSchema } from '@/schemas';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Props {
  setStep: (newStep: number) => void;
}

const CreateRestaurantStep4 = ({ setStep }: Props) => {
  const { watch } = useFormContext<CreateRestaurantInput>();
  const { setRestaurant } = usePropertyStore();
  const [isLoading, setisLoading] = useState<boolean>(false);

  const handleNext = async () => {
    setisLoading(true);
    const amenities = watch('details.amenities') || [];
    const isValid = await createRestaurantSchema.shape.details.shape.amenities.safeParseAsync(amenities);
    setisLoading(false);
    if (!isValid.success) return toast.error(isValid.error.flatten().formErrors.join(', '));
    setStep(5);
    setRestaurant({ property: watch() });
  };
  return (
    <div className="flex flex-col justify-center gap-4 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Available Amenities</h1>
        <p className="text-center font-light">
          What makes your restaurant special? Highlight your amenities to attract diners on Cityguidex.
        </p>
      </div>
      <CreatePropertyAmenities data={restaurantAmenities} name="details.amenities" />
      <CreateNavButtons isLoading={isLoading} previous={() => setStep(3)} next={handleNext} />
    </div>
  );
};

export default CreateRestaurantStep4;
