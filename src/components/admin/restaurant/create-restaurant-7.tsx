'use client';

import { CreateNavButtons, StringArrayInput } from '@/components';
import { createRestaurantSchema } from '@/schemas';
import { ICreateRestaurant, ISocialLink } from '@/types';
import { onEnter } from '@/utils';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { Controller, useController, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoAdd } from 'react-icons/io5';
import CreateRestaurantSocial from './create-restaurant-social';

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}

const CreateRestaurantStep7 = ({ setStep }: Props) => {
  const { control, getValues, setFocus, setValue, trigger, watch } = useFormContext<ICreateRestaurant>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    field: { value, onChange },
  } = useController({ control, name: 'details.paymentOptions' });

  const addNewSocial = () => {
    const socials = getValues('contact.socialMedia') || [];
    if (socials.find((s) => !s.name)) return toast.error('Use the previous social platform input');
    setValue('contact.socialMedia', [...socials, { name: '', handle: '' }]);
  };
  const addSocial = (idx: number, social: ISocialLink) => {
    const socials = getValues('contact.socialMedia') || [];
    let newSocials = socials.toSpliced(idx, 1, social);
    setValue('contact.socialMedia', newSocials);
  };
  const removeSocial = (idx: number) => {
    const socials = getValues('contact.socialMedia') || [];
    let newSocials = socials.toSpliced(idx, 1);
    setValue('contact.socialMedia', newSocials);
  };
  const handleNext = async () => {
    setIsLoading(true);
    const [isValidS, isValidT] = await Promise.all([
      createRestaurantSchema.shape.contact.shape.socialMedia.safeParseAsync(watch('contact.socialMedia')),
      trigger(['contact.email', 'contact.phone', 'details.children', 'details.delivery', 'details.reservation']),
    ]);
    setIsLoading(false);
    if (!isValidS.success || !isValidT) {
      const errors = isValidS.error?.flatten();
      return toast.error(
        errors?.formErrors.join(', ') ||
          Object.values(errors?.fieldErrors ?? {}).join(', ') ||
          'Please fill in the required fields'
      );
    }
    setIsLoading(false);
    setStep(8);
  };
  return (
    <div className="flex flex-col justify-center gap-4 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Set Restaurant Info</h1>
        <p className="text-center font-light">Provide essential details about your restaurant!</p>
      </div>
      <div className="flex flex-col gap-4 max-w-3xl py-2 mx-auto w-full">
        <div className="grid grid-cols-3 gap-3">
          <Controller
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Select
                selectedKeys={value === undefined ? undefined : [value ? 'Yes' : 'No']}
                onChange={(e) => onChange(e.target.value === 'Yes')}
                isRequired
                label="Do you have a delivery service?"
                placeholder=" "
                isInvalid={!!error}
                errorMessage={error?.message}
              >
                <SelectItem key="Yes">Yes</SelectItem>
                <SelectItem key="No">No</SelectItem>
              </Select>
            )}
            name="details.delivery"
            rules={{
              validate: (val) => {
                const isValid = createRestaurantSchema.shape.details.shape.delivery.safeParse(val);
                return isValid.success || isValid.error.flatten().formErrors.join(', ');
              },
            }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Select
                selectedKeys={value === undefined ? undefined : [value ? 'Yes' : 'No']}
                onChange={(e) => onChange(e.target.value === 'Yes')}
                isRequired
                label="Are children allowed?"
                placeholder=" "
                isInvalid={!!error}
                errorMessage={error?.message}
              >
                <SelectItem key="Yes">Yes</SelectItem>
                <SelectItem key="No">No</SelectItem>
              </Select>
            )}
            name="details.children"
            rules={{
              validate: (val) => {
                const isValid = createRestaurantSchema.shape.details.shape.children.safeParse(val);
                return isValid.success || isValid.error.flatten().formErrors.join(', ');
              },
            }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
              <Input
                name="reservation"
                label="Reservation Price"
                placeholder=" "
                type="tel"
                value={value?.toString() || ''}
                onValueChange={(val) => /^\d*$/.test(val) && onChange(+val)}
                isInvalid={!!error}
                errorMessage={error?.message}
                ref={ref}
                className="text-accentGray"
                description="Leave blank if you don't take reservations"
              />
            )}
            name="details.reservation"
            rules={{
              validate: (val) => {
                const isValid = createRestaurantSchema.shape.details.shape.reservation.safeParse(val);
                return isValid.success || isValid.error.flatten().formErrors.join(', ');
              },
            }}
          />
        </div>
        <StringArrayInput
          arr={value || []}
          label="Add the payment methods accepted at your restaurant"
          prevState={value || []}
          setState={onChange}
        />
        <Controller
          control={control}
          render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
            <Input
              name="email"
              label="Email address"
              labelPlacement="outside"
              placeholder=" "
              radius="full"
              isRequired
              value={value}
              onChange={onChange}
              onKeyDown={(e) => onEnter(e, () => setFocus('contact.phone'))}
              isInvalid={!!error}
              errorMessage={error?.message}
              ref={ref}
              className="text-accentGray"
            />
          )}
          name="contact.email"
          rules={{
            validate: (val) => {
              const isValid = createRestaurantSchema.shape.contact.shape.email.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
            <Input
              name="phone"
              label="Phone number"
              labelPlacement="outside"
              radius="full"
              placeholder=" "
              type="tel"
              value={value?.toString() || ''}
              onValueChange={(val) => /^[0-9+()\s]*$/.test(val) && onChange(val)}
              isInvalid={!!error}
              errorMessage={error?.message}
              ref={ref}
              className="text-accentGray"
            />
          )}
          name="contact.phone"
          rules={{
            validate: (val) => {
              const isValid = createRestaurantSchema.shape.contact.shape.phone.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
        />
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-10">
            <h6 className="text-accentGray text-sm font-semibold">Social Media Handle</h6>
            <Button
              className="text-xs font-medium pr-4"
              color="primary"
              radius="full"
              size="sm"
              variant="flat"
              onPress={addNewSocial}
              isLoading={isLoading}
              startContent={<IoAdd className="text-lg" />}
            >
              New
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {(watch('contact.socialMedia') || []).map((social, idx) => (
              <CreateRestaurantSocial
                {...social}
                key={social.name}
                addSocial={(social: ISocialLink) => addSocial(idx, social)}
                removeSocial={() => removeSocial(idx)}
              />
            ))}
          </div>
        </div>
      </div>
      <CreateNavButtons isLoading={isLoading} previous={() => setStep(6)} next={handleNext} />
    </div>
  );
};

export default CreateRestaurantStep7;
