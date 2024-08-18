'use client';

import { onEnter } from '@/utils';
import { Button, Chip, Input } from '@nextui-org/react';
import { useState } from 'react';
import { IoAdd, IoCloseCircle } from 'react-icons/io5';

interface Props {
  amenities: string[];
  label: string;
  customStyle?: string;
  setAmenities: (amenity: string) => void;
}

const CreateAmenities = ({ amenities, label, customStyle, setAmenities }: Props) => {
  const [inputText, setInputText] = useState('');

  const addAmenity = () => {
    setAmenities(inputText);
    setInputText('');
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {amenities.map((amenity, i) => (
          <Chip key={i} endContent={<IoCloseCircle className="text-2xl" />} onClose={() => setAmenities(amenity)}>
            {amenity}
          </Chip>
        ))}
      </div>
      <Input
        label={label}
        placeholder=" "
        radius="full"
        value={inputText}
        onValueChange={setInputText}
        onKeyDown={(e) => onEnter(e, addAmenity)}
        className={`text-accentGray mx-auto ${customStyle}`}
        variant="underlined"
        endContent={
          <Button aria-label="Add Amenity" isIconOnly radius="sm" variant="light" color="primary" onPress={addAmenity}>
            <IoAdd className="text-2xl" />
          </Button>
        }
      />
    </div>
  );
};

export default CreateAmenities;
