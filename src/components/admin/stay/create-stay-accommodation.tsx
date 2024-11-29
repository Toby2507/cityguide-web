'use client';

import { usePropertyStore } from '@/providers';
import { CreateStayInput, createStaySchema } from '@/schemas';
import { Button, Pagination } from '@nextui-org/react';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoAdd, IoRemove } from 'react-icons/io5';
import CreateNavButtons from '../common/create-nav-buttons';
import AccommodationInputs from './accommodation-inputs';

interface Props {
  setStep: (newStep: number) => void;
}

const CreateStayAccommodation = ({ setStep }: Props) => {
  const { control, watch, trigger } = useFormContext<CreateStayInput>();
  const { setStay } = usePropertyStore();
  const [accIdx, setAccIdx] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(watch('accommodation')?.length || 1);
  const { remove } = useFieldArray({ control, name: 'accommodation' });

  const addAccommodation = () => {
    setTotal(total + 1);
    setAccIdx(accIdx + 1);
  };
  const removeAccommodation = () => {
    remove(accIdx);
    setTotal(total - 1);
    setAccIdx(accIdx - 1);
  };
  const handleNext = async () => {
    setIsLoading(true);
    const [isValidT, isValidS] = await Promise.all([
      trigger('accommodation'),
      createStaySchema.shape.accommodation.safeParseAsync(watch('accommodation')),
    ]);
    setIsLoading(false);
    if (!isValidT) return toast.error('Please fill out the required fields');
    if (!isValidS.success) return toast.error('Please fill out the required fields in the other accommodations');
    setStep(8);
    setStay({ property: watch() });
  };
  return (
    <div className="flex flex-col justify-center gap-4 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Add Accommodations</h1>
        <p className="text-center font-light">Expand your offerings with diverse room types</p>
      </div>
      <div className="flex flex-col gap-4 max-w-3xl py-2 mx-auto w-full">
        <AccommodationInputs key={accIdx} idx={accIdx} />
        <div className="flex items-center justify-between gap-10">
          <Pagination total={total} page={accIdx + 1} onChange={(val) => setAccIdx(val - 1)} />
          <div className="flex items-center gap-2">
            <Button
              className="text-xs font-medium pr-4"
              color="primary"
              radius="full"
              size="sm"
              variant="flat"
              onPress={addAccommodation}
              isLoading={isLoading}
              startContent={<IoAdd className="text-lg" />}
            >
              New
            </Button>
            {accIdx ? (
              <Button
                className="text-xs font-medium pr-4"
                color="danger"
                radius="full"
                size="sm"
                variant="flat"
                onPress={removeAccommodation}
                isLoading={isLoading}
                startContent={<IoRemove className="text-lg" />}
              >
                Remove
              </Button>
            ) : null}
          </div>
        </div>
        <CreateNavButtons isLoading={isLoading} previous={() => setStep(7)} next={handleNext} />
      </div>
    </div>
  );
};

export default CreateStayAccommodation;
