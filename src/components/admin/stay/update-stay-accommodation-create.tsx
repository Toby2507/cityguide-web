'use client';

import { addAccommodationSchema } from '@/schemas';
import { addAccommodation } from '@/server';
import { IAccommodationForm } from '@/types';
import { Button, Pagination } from '@nextui-org/react';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoAdd, IoRemove } from 'react-icons/io5';
import AccommodationInputs from './accommodation-inputs';

interface Props {
  stayId: string;
  onClose: () => void;
}

const UpdateStayAccommodationCreate = ({ stayId, onClose }: Props) => {
  const method = useForm<IAccommodationForm>();
  const { control, handleSubmit, reset, trigger } = method;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accIdx, setAccIdx] = useState<number>(0);
  const [total, setTotal] = useState(1);
  const { remove } = useFieldArray({ control, name: 'accommodation' });

  const addAcc = () => {
    setTotal(total + 1);
    setAccIdx(accIdx + 1);
  };
  const removeAcc = () => {
    remove(accIdx);
    setTotal(total - 1);
    setAccIdx(accIdx - 1);
  };
  const onSubmit: SubmitHandler<IAccommodationForm> = async (data) => {
    setIsLoading(true);
    try {
      const [isValidT, isValidS] = await Promise.all([
        trigger('accommodation'),
        addAccommodationSchema.shape.body.safeParseAsync(data.accommodation),
      ]);
      if (!isValidT) return toast.error('Please fill out the required fields');
      if (!isValidS.success) return toast.error('Please fill out the required fields in the other accommodations');
      await addAccommodation(data.accommodation, stayId);
      onClose();
      reset();
      toast.success('Accommodation(s) added successfully!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FormProvider {...method}>
      <div className="flex flex-col gap-2">
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
              onPress={addAcc}
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
                onPress={removeAcc}
                isLoading={isLoading}
                startContent={<IoRemove className="text-lg" />}
              >
                Remove
              </Button>
            ) : null}
          </div>
        </div>
        <Button
          className="text-sm font-semibold px-14 py-6 my-6"
          color="primary"
          radius="full"
          onPress={() => handleSubmit(onSubmit)()}
          isLoading={isLoading}
        >
          Add Accommodations
        </Button>
      </div>
    </FormProvider>
  );
};

export default UpdateStayAccommodationCreate;
