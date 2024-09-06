'use client';

import { updateRestaurantSchema } from '@/schemas';
import { updateRestaurant } from '@/server';
import { IRestaurant, IUpdateRestaurant, PriceRange } from '@/types';
import { getObjDiff, onEnter } from '@/utils';
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { useState } from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Props {
  restaurant: IRestaurant;
  onClose: () => void;
}

const UpdateRestaurantDetails = ({ restaurant, onClose }: Props) => {
  const method = useForm<IUpdateRestaurant>({ defaultValues: restaurant, mode: 'onChange' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { control, handleSubmit, reset, setFocus } = method;

  const onSubmit: SubmitHandler<IUpdateRestaurant> = async (data) => {
    setIsLoading(true);
    try {
      const updateBody = getObjDiff(data, restaurant);
      delete updateBody.updatedAt;
      if (!Object.keys(updateBody).length) {
        onClose();
        return toast.error('No change has been made!');
      }
      await updateRestaurant(updateBody, restaurant._id);
      onClose();
      reset();
      toast.success('Restaurant detail updated successfully!');
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
                const isValid = updateRestaurantSchema.shape.name.safeParse(val);
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
                const isValid = updateRestaurantSchema.shape.summary.safeParse(val);
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
                label="Restaurant price range"
                labelPlacement="outside"
                placeholder=" "
                isInvalid={!!error}
                errorMessage={error?.message}
              >
                <SelectItem key={PriceRange.BUDGET}>{PriceRange.BUDGET}</SelectItem>
                <SelectItem key={PriceRange.MODERATE}>{PriceRange.MODERATE}</SelectItem>
                <SelectItem key={PriceRange.FINE}>{PriceRange.FINE}</SelectItem>
              </Select>
            )}
            name="priceRange"
            rules={{
              validate: (val) => {
                const isValid = updateRestaurantSchema.shape.priceRange.safeParse(val);
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
            Update Restaurant Details
          </Button>
        </div>
      </div>
    </FormProvider>
  );
};

export default UpdateRestaurantDetails;
