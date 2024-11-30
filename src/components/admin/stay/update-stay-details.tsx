'use client';

import { UpdateStayInput, updateStaySchema } from '@/schemas';
import { updateStay } from '@/server';
import { IStay } from '@/types';
import { getObjDiff } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import CreateStayOptionalServices from './create-stay-optional';

interface Props {
  stay: IStay;
  onClose: () => void;
}

const UpdateStayDetails = ({ stay, onClose }: Props) => {
  const method = useForm<UpdateStayInput>({
    defaultValues: stay,
    mode: 'onChange',
    resolver: zodResolver(updateStaySchema),
  });
  const { control, trigger, watch, reset } = method;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const isValid = await trigger(['name', 'summary', 'extraInfo', 'language']);
      if (!isValid) return toast.error('Please fill out the required fields');
      const updateBody = getObjDiff(watch(), stay);
      delete updateBody.updatedAt;
      if (!Object.keys(updateBody).length) {
        onClose();
        return toast.error('No change has been made!');
      }
      await updateStay(updateBody, stay._id);
      onClose();
      reset();
      toast.success('Stay detail updated successfully!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FormProvider {...method}>
      <div className="flex flex-col gap-6 p-2">
        <h3 className="text-2xl text-center font-semibold tracking-wide border-b py-2">Update Stay Details</h3>
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
                isRequired
                value={value}
                onChange={onChange}
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
            render={({ field: { onChange, ref, value } }) => (
              <Textarea
                name="property_description"
                label="Property Extra Details"
                labelPlacement="outside"
                placeholder=" "
                radius="full"
                value={value}
                onChange={onChange}
                ref={ref}
                className="text-accentGray"
              />
            )}
            name="extraInfo.property"
          />
          <Controller
            control={control}
            render={({ field: { onChange, ref, value } }) => (
              <Textarea
                name="neighborhood_description"
                label="Neighborhood Description"
                labelPlacement="outside"
                placeholder=" "
                radius="full"
                value={value}
                onChange={onChange}
                ref={ref}
                className="text-accentGray"
              />
            )}
            name="extraInfo.neighborhood.info"
          />
          <Controller
            control={control}
            render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
              <Input
                name="language"
                label="Language Spoken (Separate with commas)"
                labelPlacement="outside"
                placeholder=" "
                radius="full"
                isRequired
                onChange={(e) => onChange(e.target.value.split(',').map((i) => i.trim()))}
                isInvalid={!!error}
                errorMessage={error?.message}
                ref={ref}
                className="text-accentGray"
                defaultValue={value?.join(', ') || ''}
              />
            )}
            name="language"
          />
          <CreateStayOptionalServices />
          <Button
            className="text-sm font-semibold px-14 py-6 my-6"
            color="primary"
            radius="full"
            onPress={() => onSubmit()}
            isLoading={isLoading}
          >
            Update Stay
          </Button>
        </div>
      </div>
    </FormProvider>
  );
};

export default UpdateStayDetails;
