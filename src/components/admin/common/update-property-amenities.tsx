'use client';

import { restaurantAmenities, staticAmenities } from '@/data';
import { updateRestaurant, updateStay } from '@/server';
import {
  INightLife,
  IRestaurant,
  IStay,
  IUpdateNightlife,
  IUpdateRestaurant,
  IUpdateStay,
  PropertyType,
} from '@/types';
import { getObjDiff } from '@/utils';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import CreatePropertyAmenities from './create-property-amenities';

interface Props {
  property: IStay | IRestaurant | INightLife;
  type: PropertyType;
  onClose: () => void;
}

const UpdatePropertyAmenities = ({ property, type, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const method = useForm<IUpdateStay | IUpdateRestaurant | IUpdateNightlife>({
    defaultValues: property,
    mode: 'onChange',
  });
  const { handleSubmit, reset } = method;

  const onSubmit: SubmitHandler<IUpdateStay | IUpdateRestaurant | IUpdateNightlife> = async (data) => {
    setIsLoading(true);
    try {
      const updateBody = getObjDiff(data, property);
      delete updateBody.updatedAt;
      if (!Object.keys(updateBody).length) {
        onClose();
        return toast.error('No change has been made!');
      }
      if (type === PropertyType.STAY) await updateStay(updateBody, property._id);
      else await updateRestaurant(updateBody, property._id);
      onClose();
      reset();
      toast.success('Property rules updated successfully!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FormProvider {...method}>
      <div className="flex flex-col gap-6 p-2">
        <h3 className="text-2xl text-center font-semibold tracking-wide border-b py-2">Update Property Amenities</h3>
        <CreatePropertyAmenities
          data={type === PropertyType.STAY ? staticAmenities : restaurantAmenities}
          name={type === PropertyType.STAY ? 'amenities' : 'details.amenities'}
        />
        <Button
          className="text-sm font-semibold px-14 py-6 my-6"
          color="primary"
          radius="full"
          onPress={() => handleSubmit(onSubmit)()}
          isLoading={isLoading}
        >
          Update Amenities
        </Button>
      </div>
    </FormProvider>
  );
};

export default UpdatePropertyAmenities;
