'use client';

import { updateStaySchema } from '@/schemas';
import { updateStay } from '@/server';
import { IStay, IUpdateStay } from '@/types';
import { getObjDiff } from '@/utils';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CreateStayOptionalServices from './create-stay-optional';

interface Props {
  stay: IStay;
  onClose: () => void;
}

const UpdateStayDetails = ({ stay, onClose }: Props) => {
  const { control, reset, watch } = useFormContext<IUpdateStay>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const updateBody = getObjDiff(watch(), stay);
      delete updateBody.updatedAt;
      if (!Object.keys(updateBody).length) return;
      await updateStay(updateBody, stay._id);
      onClose();
      reset();
    } finally {
      setIsLoading(false);
    }
  };
  return (
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
          rules={{
            validate: (val) => {
              const isValid = updateStaySchema.shape.name.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, ref, value } }) => (
            <Input
              name="host_name"
              label="Host Name"
              labelPlacement="outside"
              placeholder=" "
              radius="full"
              value={value}
              onChange={onChange}
              ref={ref}
              className="text-accentGray"
            />
          )}
          name="extraInfo.host.name"
          rules={{
            validate: (val) => {
              const isValid = updateStaySchema.shape.extraInfo.unwrap().shape.host.unwrap().shape.name.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, ref, value } }) => (
            <Textarea
              name="host_summary"
              label="Host Summary"
              labelPlacement="outside"
              placeholder=" "
              radius="full"
              value={value}
              onChange={onChange}
              ref={ref}
              className="text-accentGray"
            />
          )}
          name="extraInfo.host.info"
          rules={{
            validate: (val) => {
              const isValid = updateStaySchema.shape.extraInfo.unwrap().shape.host.unwrap().shape.info.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
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
          rules={{
            validate: (val) => {
              const isValid = updateStaySchema.shape.extraInfo.unwrap().shape.property.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
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
          rules={{
            validate: (val) => {
              const isValid = updateStaySchema.shape.extraInfo.unwrap().shape.neighborhood.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
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
          rules={{
            validate: (val) => {
              const isValid = updateStaySchema.shape.language.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
        />
        <CreateStayOptionalServices />
        <Button
          className="text-sm font-semibold px-14 py-6 my-6"
          color="primary"
          radius="full"
          onPress={onSubmit}
          isLoading={isLoading}
        >
          Update Stay
        </Button>
      </div>
    </div>
  );
};

export default UpdateStayDetails;