'use client';

import { usePropertyStore } from '@/providers';
import { CreateStayInput, createStaySchema } from '@/schemas';
import { HotelRating, StayType } from '@/types';
import { onEnter } from '@/utils';
import { Input, Textarea } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import CustomStars from '../../common/custom-stars';
import CreateNavButtons from '../common/create-nav-buttons';

interface Props {
  setStep: (newStep: number) => void;
}

const CreateStayStep3 = ({ setStep }: Props) => {
  const { control, trigger, watch, setFocus } = useFormContext<CreateStayInput>();
  const { setStay } = usePropertyStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNext = async () => {
    setIsLoading(true);
    const [isValidS, isValidT] = await Promise.all([
      createStaySchema.shape.hotelRating.safeParseAsync(watch('hotelRating')),
      trigger(['name', 'summary', 'language']),
    ]);
    setIsLoading(false);
    if (!isValidS.success || !isValidT)
      return toast.error(isValidS.error?.flatten().formErrors.join(', ') || 'Please fill in the required fields');
    setStep(4);
    setStay({ property: watch() });
  };

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);
  return (
    <div className="flex flex-col justify-center gap-4 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Basic Property Information</h1>
        <p className="text-center font-light">
          Tell us about your space! Fill in the details to showcase your Cityguidex listing.
        </p>
      </div>
      <div className="flex flex-col gap-4 max-w-3xl py-2 mx-auto w-full">
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
              isRequired
              value={value}
              onChange={onChange}
              onKeyDown={(e) => onEnter(e, () => setFocus('language'))}
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
          render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
            <Input
              name="language"
              label="Language Spoken (Separate with commas)"
              labelPlacement="outside"
              placeholder=" "
              radius="full"
              isRequired
              onChange={(e) => onChange(e.target.value.split(',').map((i) => i.trim()))}
              onKeyDown={(e) => onEnter(e, () => setFocus('extraInfo.property'))}
              isInvalid={!!error}
              errorMessage={error?.message}
              ref={ref}
              className="text-accentGray"
              defaultValue={value?.join(', ') || ''}
            />
          )}
          name="language"
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
              onKeyDown={(e) => onEnter(e, () => watch('type') !== StayType.HOTEL && handleNext())}
              ref={ref}
              className="text-accentGray"
            />
          )}
          name="extraInfo.neighborhood.info"
        />
        {watch('type') === StayType.HOTEL ? (
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="flex flex-col gap-2">
                <h4 className="text-accentGray text-sm font-semibold">Hotel Rating</h4>
                <div className="flex items-center gap-4">
                  <CustomStars value={value} onChange={onChange} />
                </div>
              </div>
            )}
            name="hotelRating"
            defaultValue={HotelRating.NO_RATING}
          />
        ) : null}
      </div>
      <CreateNavButtons isLoading={isLoading} previous={() => setStep(2)} next={handleNext} />
    </div>
  );
};

export default CreateStayStep3;
