'use client';

import { CreateNavButtons } from '@/components';
import { usePropertyStore } from '@/providers';
import { createNightlifeSchema, createRestaurantSchema } from '@/schemas';
import { ICreateNightlife, ISocialLink, Parking } from '@/types';
import { onEnter } from '@/utils';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoAdd } from 'react-icons/io5';
import CreateRestaurantSocial from '../restaurant/create-restaurant-social';

interface Props {
  setStep: (newStep: number) => void;
}

const CreateNightlifeStep7 = ({ setStep }: Props) => {
  const { control, getValues, setFocus, setValue, trigger, watch } = useFormContext<ICreateNightlife>();
  const { setNightlife } = usePropertyStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      createNightlifeSchema.shape.contact.shape.socialMedia.safeParseAsync(watch('contact.socialMedia')),
      trigger(['contact.email', 'contact.phone', 'details.entryFee', 'rules.minAge', 'rules.parking']),
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
    setStep(8);
    setNightlife({ property: watch() });
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
            render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
              <Input
                name="minage"
                label="Minimum age allowed"
                placeholder=" "
                type="tel"
                isRequired
                value={value?.toString() || ''}
                onValueChange={(val) => /^\d*$/.test(val) && onChange(+val)}
                isInvalid={!!error}
                errorMessage={error?.message}
                ref={ref}
                className="text-accentGray"
              />
            )}
            name="rules.minAge"
            rules={{
              validate: (val) => {
                const isValid = createNightlifeSchema.shape.rules.shape.minAge.safeParse(val);
                return isValid.success || isValid.error.flatten().formErrors.join(', ');
              },
            }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
              <Input
                name="Entry Fee"
                label="Entry Fee"
                placeholder=" "
                type="tel"
                isRequired
                value={value?.toString() || ''}
                onValueChange={(val) => /^\d*$/.test(val) && onChange(+val)}
                isInvalid={!!error}
                errorMessage={error?.message}
                ref={ref}
                className="text-accentGray"
              />
            )}
            name="details.entryFee"
            rules={{
              validate: (val) => {
                const isValid = createNightlifeSchema.shape.details.shape.entryFee.safeParse(val);
                return isValid.success || isValid.error.flatten().formErrors.join(', ');
              },
            }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Select
                isRequired
                selectedKeys={value === undefined ? undefined : [value]}
                onChange={onChange}
                label="Parking"
                placeholder=" "
                isInvalid={!!error}
                errorMessage={error?.message}
              >
                {Object.values(Parking).map((item, i) => (
                  <SelectItem key={item}>{item}</SelectItem>
                ))}
              </Select>
            )}
            name="rules.parking"
            rules={{
              validate: (val) => {
                const isValid = createNightlifeSchema.shape.rules.shape.parking.safeParse(val);
                return isValid.success || isValid.error.flatten().formErrors.join(', ');
              },
            }}
          />
        </div>
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
              isRequired
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
              Add Social Media
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

export default CreateNightlifeStep7;
