'use client';

import { restaurantAmenities } from '@/data';
import { createRestaurantSchema } from '@/schemas';
import { ICreateRestaurant } from '@/types';
import { Checkbox } from '@nextui-org/react';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import CreateAmenities from '../common/create-amenities';
import CreateNavButtons from '../common/create-nav-buttons';

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}

const CreateRestaurantStep4 = ({ setStep }: Props) => {
  const { control } = useFormContext<ICreateRestaurant>();
  const {
    field: { onChange, value = [] },
  } = useController({ control, name: 'details.amenities' });
  const [isLoading, setisLoading] = useState<boolean>(false);
  const custom = useMemo(() => value.filter((v) => !restaurantAmenities.includes(v)) || [], [value]);

  const setAmenities = (amenity: string) => {
    let newAmenities = [...value];
    if (newAmenities?.includes(amenity)) newAmenities = newAmenities.filter((a) => a !== amenity);
    else newAmenities.push(amenity);
    onChange(newAmenities);
  };
  const handleNext = async () => {
    setisLoading(true);
    const isValid = await createRestaurantSchema.shape.details.shape.amenities.safeParseAsync(value);
    setisLoading(false);
    if (!isValid.success) return toast.error(isValid.error.flatten().formErrors.join(', '));
    setStep(5);
  };
  return (
    <div className="flex flex-col justify-center gap-4 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Available Amenities</h1>
        <p className="text-center font-light">
          What makes your restaurant special? Highlight your amenities to attract diners on Cityguidex.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-6 items-center gap-4 py-2 w-full">
          {Array.from(restaurantAmenities).map((amenity, i) => (
            <Checkbox
              key={i}
              size="sm"
              isSelected={value?.includes(amenity)}
              onValueChange={() => setAmenities(amenity)}
            >
              {amenity}
            </Checkbox>
          ))}
        </div>
        <CreateAmenities amenities={custom} customStyle="w-1/2" label="Other Amenities" setAmenities={setAmenities} />
      </div>
      <CreateNavButtons isLoading={isLoading} previous={() => setStep(3)} next={handleNext} />
    </div>
  );
};

export default CreateRestaurantStep4;
