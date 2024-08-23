'use client';

import { createStaySchema } from '@/schemas';
import { ICreateStay } from '@/types';
import { onEnter } from '@/utils';
import { Input, Textarea } from '@nextui-org/react';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CreateNavButtons from '../common/create-nav-buttons';

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}

const CreateStayStep4 = ({ setStep }: Props) => {
  const { control, setFocus } = useFormContext<ICreateStay>();
  useEffect(() => {
    setFocus('extraInfo.host.name');
  }, [setFocus]);
  return (
    <div className="flex flex-col justify-center gap-4 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Extra Property Information</h1>
        <p className="text-center font-light">
          Showcase your hospitality! Share a bit about yourself and your place on Cityguidex (optional).
        </p>
      </div>
      <div className="flex flex-col gap-4 max-w-3xl py-2 mx-auto w-full">
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
              onKeyDown={(e) => onEnter(e, () => setFocus('extraInfo.host.info'))}
              ref={ref}
              className="text-accentGray"
            />
          )}
          name="extraInfo.host.name"
          rules={{
            validate: (val) => {
              const isValid = createStaySchema.shape.extraInfo.unwrap().shape.host.unwrap().shape.name.safeParse(val);
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
              onKeyDown={(e) => onEnter(e, () => setFocus('extraInfo.property'))}
              ref={ref}
              className="text-accentGray"
            />
          )}
          name="extraInfo.host.info"
          rules={{
            validate: (val) => {
              const isValid = createStaySchema.shape.extraInfo.unwrap().shape.host.unwrap().shape.info.safeParse(val);
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
              onKeyDown={(e) => onEnter(e, () => setFocus('extraInfo.neighborhood.info'))}
              ref={ref}
              className="text-accentGray"
            />
          )}
          name="extraInfo.property"
          rules={{
            validate: (val) => {
              const isValid = createStaySchema.shape.extraInfo.unwrap().shape.property.safeParse(val);
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
              onKeyDown={(e) => onEnter(e, () => setStep(5))}
              ref={ref}
              className="text-accentGray"
            />
          )}
          name="extraInfo.neighborhood.info"
          rules={{
            validate: (val) => {
              const isValid = createStaySchema.shape.extraInfo.unwrap().shape.neighborhood.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
        />
      </div>
      <CreateNavButtons isLoading={false} previous={() => setStep(3)} next={() => setStep(5)} />
    </div>
  );
};

export default CreateStayStep4;
