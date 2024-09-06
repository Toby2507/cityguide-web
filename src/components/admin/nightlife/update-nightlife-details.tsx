'use client';

import { updateNightlifeSchema } from '@/schemas';
import { updateNightlife } from '@/server';
import { INightLife, IUpdateNightlife, NightLifeType } from '@/types';
import { getObjDiff, onEnter } from '@/utils';
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { useState } from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Props {
  nightlife: INightLife;
  onClose: () => void;
}

const UpdateNightlifeDetails = ({ nightlife, onClose }: Props) => {
  const method = useForm<IUpdateNightlife>({ defaultValues: nightlife, mode: 'onChange' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { control, handleSubmit, reset, setFocus } = method;

  const onSubmit: SubmitHandler<IUpdateNightlife> = async (data) => {
    setIsLoading(true);
    try {
      const updateBody = getObjDiff(data, nightlife);
      delete updateBody.updatedAt;
      if (!Object.keys(updateBody).length) {
        onClose();
        return toast.error('No change has been made!');
      }
      await updateNightlife(updateBody, nightlife._id);
      onClose();
      reset();
      toast.success('Nightlife detail updated successfully!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FormProvider {...method}>
      <div className="flex flex-col gap-6 p-2">
        <h3 className="text-2xl text-center font-semibold tracking-wide border-b py-2">Update Nightlife Details</h3>
        <div className="flex flex-col gap-2">
          <Controller
            control={control}
            render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
              <Input
                name="name"
                label="Property Name"
                labelPlacement="outside"
                placeholder=" "
                radius="full"
                value={value}
                onChange={onChange}
                onKeyDown={(e) => onEnter(e, () => setFocus('summary'))}
                isInvalid={!!error}
                errorMessage={error?.message}
                ref={ref}
                className="text-accentGray"
              />
            )}
            name="name"
            rules={{
              validate: (val) => {
                const isValid = updateNightlifeSchema.shape.name.safeParse(val);
                return isValid.success || isValid.error.flatten().formErrors.join(', ');
              },
            }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
              <Textarea
                name="summary"
                label="Property Summary"
                labelPlacement="outside"
                placeholder=" "
                radius="full"
                value={value}
                onChange={onChange}
                isInvalid={!!error}
                errorMessage={error?.message}
                ref={ref}
                className="text-accentGray"
              />
            )}
            name="summary"
            rules={{
              validate: (val) => {
                const isValid = updateNightlifeSchema.shape.summary.safeParse(val);
                return isValid.success || isValid.error.flatten().formErrors.join(', ');
              },
            }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Select
                selectedKeys={value === undefined ? undefined : [value]}
                onChange={(e) => onChange(e.target.value)}
                label="Nightlife Type"
                labelPlacement="outside"
                placeholder=" "
                isInvalid={!!error}
                errorMessage={error?.message}
              >
                <SelectItem key={NightLifeType.BAR}>{NightLifeType.BAR}</SelectItem>
                <SelectItem key={NightLifeType.CLUB}>{NightLifeType.CLUB}</SelectItem>
                <SelectItem key={NightLifeType.LOUNGE}>{NightLifeType.LOUNGE}</SelectItem>
                <SelectItem key={NightLifeType.OTHER}>{NightLifeType.OTHER}</SelectItem>
              </Select>
            )}
            name="type"
            rules={{
              validate: (val) => {
                const isValid = updateNightlifeSchema.shape.type.safeParse(val);
                return isValid.success || isValid.error.flatten().formErrors.join(', ');
              },
            }}
          />
          <Button
            className="text-sm font-semibold px-14 py-6 my-6"
            color="primary"
            radius="full"
            onPress={() => handleSubmit(onSubmit)()}
            isLoading={isLoading}
          >
            Update Nightlife Details
          </Button>
        </div>
      </div>
    </FormProvider>
  );
};

export default UpdateNightlifeDetails;
