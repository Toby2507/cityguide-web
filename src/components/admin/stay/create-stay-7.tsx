'use client';

import { createStaySchema } from '@/schemas';
import { ICreateStay, MaxDays } from '@/types';
import { parseAbsoluteToLocal } from '@internationalized/date';
import { Select, SelectItem, TimeInput, TimeInputValue } from '@nextui-org/react';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Controller, useController, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import CreateStayButtons from './create-stay-btns';

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}

const CreateStayStep7 = ({ setStep }: Props) => {
  const { control, trigger } = useFormContext<ICreateStay>();
  const {
    field: { onChange: setCheckIn, value: checkIn },
    fieldState: { error: checkinErr },
  } = useController({
    control,
    name: 'rules.checkIn',
    rules: {
      validate: (val) => {
        const isValid = createStaySchema.shape.rules.shape.checkIn.safeParse(val);
        return isValid.success || isValid.error.flatten().formErrors.join(', ');
      },
    },
  });
  const {
    field: { onChange: setCheckOut, value: checkOut },
    fieldState: { error: checkoutErr },
  } = useController({
    control,
    name: 'rules.checkOut',
    rules: {
      validate: (val) => {
        const isValid = createStaySchema.shape.rules.shape.checkOut.safeParse(val);
        return isValid.success || isValid.error.flatten().formErrors.join(', ');
      },
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checkinFrom, setCheckinFrom] = useState<TimeInputValue>();
  const [checkinTo, setCheckinTo] = useState<TimeInputValue>();
  const [checkoutFrom, setCheckoutFrom] = useState<TimeInputValue>();
  const [checkoutTo, setCheckoutTo] = useState<TimeInputValue>();

  const handleNext = async () => {
    setIsLoading(true);
    const isValid = await trigger(['rules', 'maxDays']);
    setIsLoading(false);
    if (!isValid) return toast.error('Please fill out the required fields');
    setStep(8);
  };

  useEffect(() => {
    if (checkinFrom && checkinTo)
      setCheckIn(
        `${String(checkinFrom?.hour).padStart(2, '0')}:${String(checkinFrom?.minute).padStart(2, '0')}-${String(
          checkinTo?.hour
        ).padStart(2, '0')}:${String(checkinTo?.minute).padStart(2, '0')}`
      );
    if (checkoutFrom && checkoutTo)
      setCheckOut(
        `${String(checkoutFrom?.hour).padStart(2, '0')}:${String(checkoutFrom?.minute).padStart(2, '0')}-${String(
          checkoutTo?.hour
        ).padStart(2, '0')}:${String(checkoutTo?.minute).padStart(2, '0')}`
      );
  }, [checkinFrom, checkinTo, checkoutFrom, checkoutTo, setCheckIn, setCheckOut]);
  return (
    <div className="flex flex-col justify-center gap-4 pt-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Set Property Rules</h1>
        <p className="text-center font-light">Set expectations! Clearly outline your house rules for a smooth stay</p>
      </div>
      <div className="flex flex-col gap-4 max-w-3xl py-2 mx-auto w-full">
        <div className="flex flex-col gap-3">
          <h6 className="text-sm font-semibold">Check-In</h6>
          <div className="flex items-center gap-10">
            <TimeInput
              isRequired
              isInvalid={!!checkinErr}
              errorMessage={checkinErr?.message}
              value={checkinFrom}
              onChange={setCheckinFrom}
              label="From"
              hideTimeZone
              defaultValue={
                checkIn ? parseAbsoluteToLocal(dayjs(`1-1-1 ${checkIn.split('-')[0]}`).toISOString()) : undefined
              }
            />
            <TimeInput
              isRequired
              isInvalid={!!checkinErr}
              errorMessage={checkinErr?.message}
              value={checkinTo}
              onChange={setCheckinTo}
              label="Until"
              hideTimeZone
              defaultValue={
                checkIn ? parseAbsoluteToLocal(dayjs(`1-1-1 ${checkIn.split('-')[1]}`).toISOString()) : undefined
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h6 className="text-sm font-semibold">Check-Out</h6>
          <div className="flex items-center gap-10">
            <TimeInput
              isRequired
              isInvalid={!!checkoutErr}
              errorMessage={checkoutErr?.message}
              value={checkoutFrom}
              onChange={setCheckoutFrom}
              label="From"
              hideTimeZone
              defaultValue={
                checkOut ? parseAbsoluteToLocal(dayjs(`1-1-1 ${checkOut.split('-')[0]}`).toISOString()) : undefined
              }
            />
            <TimeInput
              isRequired
              isInvalid={!!checkoutErr}
              errorMessage={checkoutErr?.message}
              value={checkoutTo}
              onChange={setCheckoutTo}
              label="Until"
              hideTimeZone
              defaultValue={
                checkOut ? parseAbsoluteToLocal(dayjs(`1-1-1 ${checkOut.split('-')[1]}`).toISOString()) : undefined
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 pt-2">
          <Controller
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Select
                selectedKeys={value === undefined ? undefined : [value ? 'Yes' : 'No']}
                onChange={(e) => onChange(e.target.value === 'Yes')}
                isRequired
                label="Is Smoking allowed?"
                placeholder=" "
                isInvalid={!!error}
                errorMessage={error?.message}
              >
                <SelectItem key="Yes">Yes</SelectItem>
                <SelectItem key="No">No</SelectItem>
              </Select>
            )}
            name="rules.smoking"
            rules={{
              validate: (val) => {
                const isValid = createStaySchema.shape.rules.shape.smoking.safeParse(val);
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
                label="Are Pets allowed?"
                placeholder=" "
                isInvalid={!!error}
                errorMessage={error?.message}
              >
                <SelectItem key="Yes">Yes</SelectItem>
                <SelectItem key="No">No</SelectItem>
              </Select>
            )}
            name="rules.pets"
            rules={{
              validate: (val) => {
                const isValid = createStaySchema.shape.rules.shape.pets.safeParse(val);
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
                label="Are Parties allowed?"
                placeholder=" "
                isInvalid={!!error}
                errorMessage={error?.message}
              >
                <SelectItem key="Yes">Yes</SelectItem>
                <SelectItem key="No">No</SelectItem>
              </Select>
            )}
            name="rules.parties"
            rules={{
              validate: (val) => {
                const isValid = createStaySchema.shape.rules.shape.parties.safeParse(val);
                return isValid.success || isValid.error.flatten().formErrors.join(', ');
              },
            }}
          />
        </div>
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Select
              isRequired
              selectedKeys={value === undefined ? undefined : [value]}
              onChange={(e) => onChange(parseInt(e.target.value))}
              label="Specify the maximum number of nights a guest can book your property at one time"
              defaultSelectedKeys={[MaxDays.DEFAULT]}
              isInvalid={!!error}
              errorMessage={error?.message}
            >
              <SelectItem key={MaxDays.DEFAULT}>{`${MaxDays.DEFAULT} days`}</SelectItem>
              <SelectItem key={MaxDays.QUARTER}>{`${MaxDays.QUARTER} days`}</SelectItem>
              <SelectItem key={MaxDays.HALF}>{`${MaxDays.HALF} days`}</SelectItem>
              <SelectItem key={MaxDays.FULL}>{`${MaxDays.FULL} days`}</SelectItem>
            </Select>
          )}
          name="maxDays"
          rules={{
            validate: (val) => {
              const isValid = createStaySchema.shape.maxDays.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
        />
      </div>
      <CreateStayButtons isLoading={isLoading} previous={() => setStep(6)} next={handleNext} />
    </div>
  );
};

export default CreateStayStep7;
