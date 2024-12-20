'use client';

import { StringArrayInput } from '@/components';
import { UpdateRestaurantInput, updateRestaurantSchema } from '@/schemas';
import { updateRestaurant } from '@/server';
import { DayOfWeek, IRestaurant } from '@/types';
import { getObjDiff } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseAbsoluteToLocal } from '@internationalized/date';
import { Button, Select, SelectItem, TimeInput, TimeInputValue } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useController, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import RestaurantContactReservationInfo from './contact-reservation-info';

interface Props {
  restaurant: IRestaurant;
  onClose: () => void;
}

const UpdateRestaurantInfo = ({ restaurant, onClose }: Props) => {
  const method = useForm<UpdateRestaurantInput>({
    defaultValues: restaurant,
    mode: 'onChange',
    resolver: zodResolver(updateRestaurantSchema),
  });
  const { control, getValues, reset, setValue, trigger, watch } = method;
  const avails = (getValues('availability') || []).map((a, i) => (a ? i : 7)).filter((p) => p < 7);
  const [openAvails, setOpenAvails] = useState<number[]>(avails);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    field: { onChange: setServiceStyle, value: serviceStyle },
  } = useController({ control, name: 'serviceStyle' });
  const {
    field: { onChange: setCuisines, value: cuisines },
  } = useController({ control, name: 'cuisine' });
  const {
    field: { onChange: setDietaries, value: dietaries },
  } = useController({ control, name: 'dietaryProvisions' });

  const openCloseAvail = (idx: number, state: string) => {
    state === 'close' && setValue(`availability.${idx}`, null);
    setOpenAvails((prev) => prev.filter((p) => p !== idx).concat(state === 'close' ? [] : [idx]));
  };
  const setAvailability = (time: TimeInputValue, idx: number, field: 'from' | 'to') => {
    const timeString = `${time.hour.toString().padStart(2, '0')}:${time.minute.toString().padStart(2, '0')}`;
    setValue(`availability.${idx}.day`, Object.values(DayOfWeek)[idx]);
    setValue(`availability.${idx}.${field}`, timeString);
  };
  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const isValid = await trigger([
        'serviceStyle',
        'cuisine',
        'dietaryProvisions',
        'availability',
        'contact',
        'details',
        'currency',
        'cancellationPolicy',
        'proxyPaymentEnabled',
      ]);
      if (!isValid) return toast.error('Please fill out the required fields');
      let data = watch();
      data = { ...data, availability: data.availability?.filter(Boolean) };
      if (data.cancellationPolicy === null) data.cancellationPolicy = { daysFromReservation: 0, percentRefundable: 0 };
      const updateBody = getObjDiff(data, restaurant);
      delete updateBody.updatedAt;
      if (!Object.keys(updateBody).length) {
        onClose();
        return toast.error('No change has been made!');
      }
      if (
        updateBody.cancellationPolicy &&
        !updateBody.cancellationPolicy.daysFromReservation &&
        !updateBody.cancellationPolicy.percentRefundable
      )
        updateBody.cancellationPolicy = null;
      await updateRestaurant(updateBody, restaurant._id);
      onClose();
      reset();
      toast.success('Restaurant information updated successfully!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FormProvider {...method}>
      <section className="flex flex-col gap-6 p-2">
        <h3 className="text-2xl text-center font-semibold tracking-wide border-b py-2">Update Property Info</h3>
        <article className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h6 className="text-lg font-medium">Availability</h6>
            <div className="grid grid-cols-2 gap-4">
              {Object.values(DayOfWeek).map((item, i) => {
                const [from, to] = watch([`availability.${i}.from`, `availability.${i}.to`]);
                const fromValue = from ? parseAbsoluteToLocal(dayjs(`2000-01-01 ${from}`).toISOString()) : undefined;
                const toValue = to ? parseAbsoluteToLocal(dayjs(`2000-01-01 ${to}`).toISOString()) : undefined;
                return (
                  <div key={item} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm text-black/60 font-medium">{item}</p>
                      <Select
                        selectedKeys={[openAvails.includes(i) ? 'open' : 'close']}
                        onChange={(e) => openCloseAvail(i, e.target.value)}
                        isRequired
                        placeholder="Close"
                        aria-label={`${item} availability`}
                        className="w-24"
                      >
                        <SelectItem key="open">Open</SelectItem>
                        <SelectItem key="close">Close</SelectItem>
                      </Select>
                    </div>
                    {openAvails.includes(i) ? (
                      <div className="grid grid-cols-2 gap-2">
                        <TimeInput
                          value={fromValue}
                          onChange={(val) => setAvailability(val, i, 'from')}
                          label="Open From"
                          hideTimeZone
                        />
                        <TimeInput
                          value={toValue}
                          onChange={(val) => setAvailability(val, i, 'to')}
                          label="Close At"
                          hideTimeZone
                        />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
          <StringArrayInput
            arr={serviceStyle || []}
            label="Service Style"
            placeholder="e.g. Fast-food, Drive-through"
            prevState={serviceStyle || []}
            setState={setServiceStyle}
          />
          <StringArrayInput
            arr={cuisines || []}
            label="Cuisines"
            placeholder="e.g. Chinese, Italian"
            prevState={cuisines || []}
            setState={setCuisines}
          />
          <StringArrayInput
            arr={dietaries || []}
            label="Dietary Provisions"
            placeholder="e.g. Vegetarian, Gluten-free"
            prevState={dietaries || []}
            setState={setDietaries}
          />
          <RestaurantContactReservationInfo />
          <Button
            className="text-sm font-semibold px-14 py-6 my-4"
            color="primary"
            radius="full"
            variant="solid"
            onPress={() => onSubmit()}
            isLoading={isLoading}
          >
            Update Restaurant Info
          </Button>
        </article>
      </section>
    </FormProvider>
  );
};

export default UpdateRestaurantInfo;
