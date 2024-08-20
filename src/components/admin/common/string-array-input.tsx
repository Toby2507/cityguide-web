'use client';

import { onEnter } from '@/utils';
import { Button, Chip, Input } from '@nextui-org/react';
import { useState } from 'react';
import { FieldError } from 'react-hook-form';
import { IoAdd, IoCloseCircle } from 'react-icons/io5';

interface Props {
  arr: string[];
  prevState: string[];
  label: string;
  placeholder?: string;
  customStyle?: string;
  error?: FieldError;
  setState: (...event: any[]) => void;
}

const StringArrayInputs = ({ arr, label, customStyle, error, placeholder, prevState, setState }: Props) => {
  const [inputText, setInputText] = useState('');

  const addAmenity = () => {
    let newState = [...prevState];
    if (newState.includes(inputText)) newState = newState.filter((a) => a !== inputText);
    else newState.push(inputText);
    setState(newState);
    setInputText('');
  };
  const removeItem = (item: string) => {
    const newState = prevState.filter((a) => a !== item);
    setState(newState);
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {arr.map((item, i) => (
          <Chip key={i} endContent={<IoCloseCircle className="text-2xl" />} onClose={() => removeItem(item)}>
            {item}
          </Chip>
        ))}
      </div>
      <Input
        label={label}
        placeholder={placeholder || ' '}
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
