'use client';

import { UpdateNightlifeInput, updateNightlifeSchema } from '@/schemas';
import { updateNightlife } from '@/server';
import { INightLife, NightLifeType } from '@/types';
import { getObjDiff, onEnter } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Props {
  nightlife: INightLife;
  onClose: () => void;
}

const UpdateNightlifeDetails = ({ nightlife, onClose }: Props) => {
  const method = useForm<UpdateNightlifeInput>({
    defaultValues: nightlife,
    mode: 'onChange',
    resolver: zodResolver(updateNightlifeSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { control, reset, trigger, watch, setFocus } = method;

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const isValid = await trigger(['name', 'summary', 'type']);
      if (!isValid) return toast.error('Please fill out the required fields');
      const updateBody = getObjDiff(watch(), nightlife);
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
                <SelectItem key={NightLifeType.ATTRACTION}>{NightLifeType.ATTRACTION}</SelectItem>
                <SelectItem key={NightLifeType.OTHER}>{NightLifeType.OTHER}</SelectItem>
              </Select>
            )}
            name="type"
          />
          <Button
            className="text-sm font-semibold px-14 py-6 my-6"
            color="primary"
            radius="full"
            onPress={() => onSubmit()}
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
