'use client';

import { updateStaySchema } from '@/schemas';
import { updateStay } from '@/server';
import { IStay, IUpdateStay, MaxDays } from '@/types';
import { getObjDiff } from '@/utils';
import { parseAbsoluteToLocal } from '@internationalized/date';
import { Button, Select, SelectItem, TimeInput, TimeInputValue } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Controller, useController, useFormContext } from 'react-hook-form';

// interface IUpdateStay {
//   address?: IAddress;
//   avatar?: string;
//   images?: string[];
//   amenities?: string[];
// }

interface Props {
  stay: IStay;
  onClose: () => void;
}

const UpdateStayRules = ({ stay, onClose }: Props) => {
  const { control, reset, watch } = useFormContext<IUpdateStay>();
  const {
    field: { onChange: setCheckIn, value: checkIn },
    fieldState: { error: checkinErr },
  } = useController({
    control,
    name: 'rules.checkIn',
    rules: {
      validate: (val) => {
        const isValid = updateStaySchema.shape.rules.unwrap().shape.checkIn.safeParse(val);
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
        const isValid = updateStaySchema.shape.rules.unwrap().shape.checkOut.safeParse(val);
        return isValid.success || isValid.error.flatten().formErrors.join(', ');
      },
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checkinFrom, setCheckinFrom] = useState<TimeInputValue>();
  const [checkinTo, setCheckinTo] = useState<TimeInputValue>();
  const [checkoutFrom, setCheckoutFrom] = useState<TimeInputValue>();
  const [checkoutTo, setCheckoutTo] = useState<TimeInputValue>();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const updateBody = getObjDiff(watch(), stay);
      delete updateBody.updatedAt;
      if (!Object.keys(updateBody).length) return;
      await updateStay(updateBody, stay._id);
      onClose();
      reset();
    } finally {
      setIsLoading(false);
    }
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
    <div className="flex flex-col gap-6 p-2">
      <h3 className="text-2xl text-center font-semibold tracking-wide border-b py-2">Update Property Rules</h3>
      <div className="flex flex-col gap-2">
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
                const isValid = updateStaySchema.shape.rules.unwrap().shape.smoking.safeParse(val);
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
                const isValid = updateStaySchema.shape.rules.unwrap().shape.pets.safeParse(val);
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
                const isValid = updateStaySchema.shape.rules.unwrap().shape.parties.safeParse(val);
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
              const isValid = updateStaySchema.shape.maxDays.safeParse(val);
              return isValid.success || isValid.error.flatten().formErrors.join(', ');
            },
          }}
        />
        <Button
          className="text-sm font-semibold px-14 py-6 my-6"
          color="primary"
          radius="full"
          variant="solid"
          onPress={onSubmit}
          isLoading={isLoading}
        >
          Update Stay
        </Button>
      </div>
    </div>
  );
};

export default UpdateStayRules;
