'use client';

import { StringArrayInput } from '@/components';
import { UpdateNightlifeInput, updateNightlifeSchema } from '@/schemas';
import { updateNightlife } from '@/server';
import { DayOfWeek, INightLife } from '@/types';
import { getObjDiff } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseAbsoluteToLocal } from '@internationalized/date';
import { Button, Select, SelectItem, TimeInput, TimeInputValue } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useController, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import NightlifeInfo from './nightlife-info';

interface Props {
  nightlife: INightLife;
  onClose: () => void;
}

const UpdateNightlifeInfo = ({ nightlife, onClose }: Props) => {
  const method = useForm<UpdateNightlifeInput>({
    defaultValues: nightlife,
    mode: 'onChange',
    resolver: zodResolver(updateNightlifeSchema),
  });
  const { control, getValues, handleSubmit, reset, setValue, watch } = method;
  const avails = (getValues('availability') || []).map((a, i) => (a ? i : 7)).filter((p) => p < 7);
  const [openAvails, setOpenAvails] = useState<number[]>(avails);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    field: { onChange: setPaymentoptions, value: paymentoptions },
    fieldState: { error },
  } = useController({ control, name: 'details.paymentOptions' });
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
  const onSubmit: SubmitHandler<UpdateNightlifeInput> = async (data) => {
    setIsLoading(true);
    try {
      const updatedData = { ...data, availability: data.availability?.filter(Boolean) };
      const updateBody = getObjDiff(updatedData, nightlife);
      delete updateBody.updatedAt;
      if (!Object.keys(updateBody).length) {
        onClose();
        return toast.error('No change has been made!');
      }
      await updateNightlife(updateBody, nightlife._id);
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
          <NightlifeInfo />
          <Button
            className="text-sm font-semibold px-14 py-6 my-4"
            color="primary"
            radius="full"
            variant="solid"
            onPress={() => handleSubmit(onSubmit)()}
            isLoading={isLoading}
          >
            Update Restaurant Info
          </Button>
        </article>
      </section>
    </FormProvider>
  );
};

export default UpdateNightlifeInfo;
