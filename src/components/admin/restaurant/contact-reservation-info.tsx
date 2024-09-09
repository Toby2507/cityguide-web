'use client';

import { updateRestaurantSchema } from '@/schemas';
import { ICreateRestaurant, ISocialLink } from '@/types';
import { onEnter } from '@/utils';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Controller, useController, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoAdd } from 'react-icons/io5';
import StringArrayInput from '../common/string-array-input';
import CreateRestaurantSocial from './create-restaurant-social';

const RestaurantContactReservationInfo = () => {
  const { control, getValues, setFocus, setValue, watch } = useFormContext<ICreateRestaurant>();
  const [reservation, setReservation] = useState<boolean>(!!getValues('details.reservation') || false);
  const {
    field: { value, onChange },
  } = useController({
    control,
    name: 'details.paymentOptions',
    rules: {
      validate: (val) => {
        const isValid = updateRestaurantSchema.shape.details.unwrap().shape.paymentOptions.safeParse(val);
        return isValid.success || isValid.error.flatten().formErrors.join(', ');
      },
    },
  });

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

  useEffect(() => {
    if (!reservation) setValue('details.reservation', undefined);
    else !getValues('details.reservation') && setValue('details.reservation', { available: 1, max: 1, price: 0 });
  }, [reservation, getValues, setValue]);
  return (
    <div className="flex flex-col gap-4 pb-2 w-full">
      <StringArrayInput
        arr={value || []}
        label="Add the payment methods accepted at your restaurant"
        prevState={value || []}
        setState={onChange}
      />
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
              const isValid = updateRestaurantSchema.shape.details.unwrap().shape.delivery.safeParse(val);
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
              const isValid = updateRestaurantSchema.shape.details.unwrap().shape.children.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
        />
        <Select
          selectedKeys={[reservation ? 'Yes' : 'No']}
          onChange={(e) => setReservation(e.target.value === 'Yes')}
          label="Reservation service?"
          placeholder=" "
        >
          <SelectItem key="Yes">Yes</SelectItem>
          <SelectItem key="No">No</SelectItem>
        </Select>
      </div>
      {reservation ? (
        <div className="grid grid-cols-3 gap-3">
          <Controller
            control={control}
            render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
              <Input
                name="reservation_available"
                label="No of tables available"
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
            name="details.reservation.available"
            rules={{
              validate: (val) => {
                const isValid = updateRestaurantSchema.shape.details
                  .unwrap()
                  .shape.reservation.unwrap()
                  .shape.available.safeParse(val);
                return isValid.success || isValid.error.flatten().formErrors.join(', ');
              },
            }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
              <Input
                name="reservation_table"
                label="Max guests per table"
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
            name="details.reservation.max"
            rules={{
              validate: (val) => {
                const isValid = updateRestaurantSchema.shape.details
                  .unwrap()
                  .shape.reservation.unwrap()
                  .shape.max.safeParse(val);
                return isValid.success || isValid.error.flatten().formErrors.join(', ');
              },
            }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
              <Input
                name="reservation"
                label="Table Price"
                placeholder=" "
                type="tel"
                isRequired
                value={value?.toString() || ''}
                onValueChange={(val) => /^[\d.]*$/.test(val) && onChange(+val)}
                isInvalid={!!error}
                errorMessage={error?.message}
                ref={ref}
                className="text-accentGray"
              />
            )}
            name="details.reservation.price"
            rules={{
              validate: (val) => {
                const isValid = updateRestaurantSchema.shape.details
                  .unwrap()
                  .shape.reservation.unwrap()
                  .shape.price.safeParse(val);
                return isValid.success || isValid.error.flatten().formErrors.join(', ');
              },
            }}
          />
        </div>
      ) : null}

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
            const isValid = updateRestaurantSchema.shape.contact.unwrap().shape.email.safeParse(val);
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
            const isValid = updateRestaurantSchema.shape.contact.unwrap().shape.phone.safeParse(val);
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
  );
};

export default RestaurantContactReservationInfo;
