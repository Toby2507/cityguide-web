'use client';

import { CreateNavButtons, StringArrayInput } from '@/components';
import { usePropertyStore } from '@/providers';
import { createRestaurantSchema } from '@/schemas';
import { DayOfWeek, ICreateRestaurant } from '@/types';
import { parseAbsoluteToLocal } from '@internationalized/date';
import { Select, SelectItem, TimeInput, TimeInputValue } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Props {
  setStep: (newStep: number) => void;
}

const CreateRestaurantStep6 = ({ setStep }: Props) => {
  const { control, getValues, setValue, watch } = useFormContext<ICreateRestaurant>();
  const { setRestaurant } = usePropertyStore();
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
  const handleNext = async () => {
    setIsLoading(true);
    const avail = watch('availability').filter(Boolean);
    const isValidS = await createRestaurantSchema.shape.availability.safeParseAsync(avail);
    setIsLoading(false);
    if (!isValidS.success) {
      const errors = isValidS.error.flatten();
      return toast.error(errors.formErrors.join(', ') || Object.values(errors.fieldErrors).join(', '));
    }
    setStep(7);
    setRestaurant({ property: watch() });
  };

  useEffect(() => {
    !getValues('availability') && setValue('availability', [null, null, null, null, null, null, null]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col justify-center gap-4 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Set Restaurant Details</h1>
        <p className="text-center font-light">
          Set the stage for a delightful dining experience! Clearly outline your restaurant&apos;s details
        </p>
      </div>
      <div className="flex flex-col gap-6 max-w-3xl py-2 mx-auto w-full">
        <div className="flex flex-col gap-2">
          <h6 className="text-lg font-medium">
            Availability <span className="text-sm text-danger">*</span>
          </h6>
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
      </div>
      <CreateNavButtons isLoading={isLoading} previous={() => setStep(5)} next={handleNext} />
    </div>
  );
};

export default CreateRestaurantStep6;
