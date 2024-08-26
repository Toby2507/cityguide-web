'use client';

import { Checkbox } from '@nextui-org/react';
import { useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import StringArrayInput from './string-array-input';

interface Props {
  data: string[];
  name: string;
}

const CreatePropertyAmenities = ({ data, name }: Props) => {
  const { control } = useFormContext();
  const {
    field: { onChange, value = [] },
  } = useController({ control, name });
  const custom = useMemo(() => value.filter((v: string) => !data.includes(v)) || [], [data, value]);

  const setAmenities = (amenity: string) => {
    let newAmenities = [...value];
    if (newAmenities?.includes(amenity)) newAmenities = newAmenities.filter((a) => a !== amenity);
    else newAmenities.push(amenity);
    onChange(newAmenities);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-6 items-center gap-4 py-2 w-full">
        {Array.from(data).map((amenity, i) => (
          <Checkbox key={i} size="sm" isSelected={value?.includes(amenity)} onValueChange={() => setAmenities(amenity)}>
            {amenity}
          </Checkbox>
        ))}
      </div>
      <StringArrayInput
        arr={custom}
        customStyle="w-1/2"
        label="Other Amenities"
        prevState={value}
        setState={onChange}
      />
    </div>
  );
};

export default CreatePropertyAmenities;
