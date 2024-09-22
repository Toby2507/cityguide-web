'use client';

import { usePropertyStore } from '@/providers';
import { createNightlifeSchema } from '@/schemas';
import { DayOfWeek, ICreateNightlife } from '@/types';
import { parseAbsoluteToLocal } from '@internationalized/date';
import { Select, SelectItem, TimeInput, TimeInputValue } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import CreateNavButtons from '../common/create-nav-buttons';
import StringArrayInput from '../common/string-array-input';

interface Props {
  setStep: (newStep: number) => void;
}

const CreateNightlifeStep6 = ({ setStep }: Props) => {
  const { control, getValues, setValue, watch, trigger } = useFormContext<ICreateNightlife>();
  const { setNightlife } = usePropertyStore();
  const avails = (getValues('availability') || []).map((a, i) => (a ? i : 7)).filter((p) => p < 7);
  const [openAvails, setOpenAvails] = useState<number[]>(avails);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    field: { onChange: setPaymentoptions, value: paymentoptions },
    fieldState: { error },
  } = useController({
    control,
    name: 'details.paymentOptions',
    rules: {
      validate: (val) => {
        const isValid = createNightlifeSchema.shape.details.shape.paymentOptions.safeParse(val);
        return isValid.success || isValid.error.flatten().formErrors.join(', ');
      },
    },
  });
  const {
    field: { onChange: setDresscode, value: dresscode },
  } = useController({ control, name: 'rules.dressCode' });
  const {
    field: { onChange: setMusicgenres, value: musicgenres },
  } = useController({ control, name: 'rules.musicGenre' });

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
    const [isValidS, isValidT] = await Promise.all([
      createNightlifeSchema.shape.availability.safeParseAsync(avail),
      trigger('details.paymentOptions'),
    ]);
    setIsLoading(false);
    if (!isValidS.success || !isValidT) {
      const errors = isValidS.error?.flatten();
      return toast.error(
        errors?.formErrors.join(', ') ||
          Object.values(errors?.fieldErrors ?? {}).join(', ') ||
          'Please fill in the reqquired fields'
      );
    }
    setStep(7);
    setNightlife({ property: watch() });
  };

  useEffect(() => {
    !getValues('availability') && setValue('availability', [null, null, null, null, null, null, null]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col justify-center gap-4 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Set Nightlife Details</h1>
        <p className="text-center font-light">
          Set the stage for a delightful experience! Clearly outline your nightlife&apos;s details
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
          arr={paymentoptions || []}
          label="Payment Options"
          placeholder="e.g. Cash, Debit card"
          prevState={paymentoptions || []}
          error={error}
          setState={setPaymentoptions}
        />
        <StringArrayInput
          arr={dresscode || []}
          label="Dress Code"
          placeholder="e.g. Corporate, All White"
          prevState={dresscode || []}
          setState={setDresscode}
        />
        <StringArrayInput
          arr={musicgenres || []}
          label="Music Genres"
          placeholder="e.g. EDM, HipHop"
          prevState={musicgenres || []}
          setState={setMusicgenres}
        />
      </div>
      <CreateNavButtons isLoading={isLoading} previous={() => setStep(5)} next={handleNext} />
    </div>
  );
};

export default CreateNightlifeStep6;
