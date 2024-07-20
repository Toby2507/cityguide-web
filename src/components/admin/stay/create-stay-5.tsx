'use client';

import { staticAmenities } from '@/data';
import { createStaySchema } from '@/utils';
import { Checkbox } from '@nextui-org/react';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { Control, FieldValues, useController } from 'react-hook-form';
import toast from 'react-hot-toast';
import CreateStayAmenities from './create-stay-amenities';
import CreateStayButtons from './create-stay-btns';

interface ICreateStay {
  control: Control<FieldValues, any>;
  setStep: Dispatch<SetStateAction<number>>;
}

const CreateStayStep5 = ({ control, setStep }: ICreateStay) => {
  const {
    field: { onChange, value = [] },
  } = useController({ control, name: 'amenities' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const custom = useMemo<string[]>(() => value?.filter((v: string) => !staticAmenities.has(v)) || [], [value]);

  const setAmenities = (amenity: string) => {
    let newAmenities = [...value];
    if (newAmenities?.includes(amenity)) newAmenities = newAmenities.filter((a) => a !== amenity);
    else newAmenities.push(amenity);
    onChange(newAmenities);
  };
  const handleNext = async () => {
    setIsLoading(true);
    const isValid = await createStaySchema.shape.amenities.safeParseAsync(value);
    setIsLoading(false);
    if (!isValid.success) return toast.error(isValid.error.flatten().formErrors.join(', '));
    setStep(6);
  };
  return (
    <div className="flex flex-col justify-center gap-4 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Available Amenities</h1>
        <p className="text-center font-light">
          What makes your place special? Highlight your amenities to attract guests on Cityguidex.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-6 items-center gap-4 py-2 w-full">
          {Array.from(staticAmenities).map((amenity, i) => (
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
        <CreateStayAmenities
          amenities={custom}
          customStyle="w-1/2"
          label="Other Amenities"
          setAmenities={setAmenities}
        />
      </div>
      <CreateStayButtons isLoading={isLoading} previous={() => setStep(4)} next={handleNext} />
    </div>
  );
};

export default CreateStayStep5;
