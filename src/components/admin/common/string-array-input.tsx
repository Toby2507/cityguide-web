'use client';

import { onEnter } from '@/utils';
import { Button, Chip, Input } from '@nextui-org/react';
import { useState } from 'react';
import { FieldError } from 'react-hook-form';
import { IoAdd, IoCloseCircle } from 'react-icons/io5';

interface Props {
  arr: string[];
  label: string;
  customStyle?: string;
  error?: FieldError;
  addToArray: (item: string) => void;
}

const StringArrayInputs = ({ arr, label, customStyle, error, addToArray }: Props) => {
  const [inputText, setInputText] = useState('');

  const addAmenity = () => {
    addToArray(inputText);
    setInputText('');
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {arr.map((item, i) => (
          <Chip key={i} endContent={<IoCloseCircle className="text-2xl" />} onClose={() => addToArray(item)}>
            {item}
          </Chip>
        ))}
      </div>
      <Input
        label={label}
        placeholder=" "
        radius="full"
        value={inputText}
        isInvalid={!!error}
        errorMessage={error?.message}
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

export default StringArrayInputs;
