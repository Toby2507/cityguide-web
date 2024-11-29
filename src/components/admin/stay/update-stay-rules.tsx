'use client';

import { StringArrayInput } from '@/components';
import { UpdateStayInput, updateStaySchema } from '@/schemas';
import { getCurrencies, updateStay } from '@/server';
import { IStay, MaxDays } from '@/types';
import { getObjDiff, onEnter } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseAbsoluteToLocal } from '@internationalized/date';
import { Button, Input, Select, SelectItem, TimeInput, TimeInputValue } from '@nextui-org/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Controller, FormProvider, useController, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Props {
  stay: IStay;
  onClose: () => void;
}
const defaultCancelPolicy = { daysFromReservation: 1, percentRefundable: 1 };

const UpdateStayRules = ({ stay, onClose }: Props) => {
  const method = useForm<UpdateStayInput>({
    defaultValues: stay,
    mode: 'onChange',
    resolver: zodResolver(updateStaySchema),
  });
  const { control, setFocus, reset, watch } = method;
  const { data: currencies } = useSuspenseQuery({
    queryKey: ['currencies'],
    queryFn: getCurrencies,
    staleTime: 1000 * 60 * 60 * 24,
  });
  const {
    field: { onChange: setCheckIn, value: checkIn },
    fieldState: { error: checkinErr },
  } = useController({ control, name: 'rules.checkIn' });
  const {
    field: { onChange: setCheckOut, value: checkOut },
    fieldState: { error: checkoutErr },
  } = useController({ control, name: 'rules.checkOut' });
  const {
    field: { onChange: setPaymentMethod, value: paymentMethods },
  } = useController({ control, name: 'paymentMethods' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checkinFrom, setCheckinFrom] = useState<TimeInputValue>();
  const [checkinTo, setCheckinTo] = useState<TimeInputValue>();
  const [checkoutFrom, setCheckoutFrom] = useState<TimeInputValue>();
  const [checkoutTo, setCheckoutTo] = useState<TimeInputValue>();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const data = watch();
      if (data.cancellationPolicy === null) data.cancellationPolicy = { daysFromReservation: 0, percentRefundable: 0 };
      const updateBody = getObjDiff(data, stay);
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
      await updateStay(updateBody, stay._id);
      onClose();
      reset();
      toast.success('Stay rules updated successfully!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (checkIn) {
      setCheckinFrom(parseAbsoluteToLocal(dayjs(`1-1-1 ${checkIn.split('-')[0]}`).toISOString()));
      setCheckinTo(parseAbsoluteToLocal(dayjs(`1-1-1 ${checkIn.split('-')[1]}`).toISOString()));
    }
    if (checkOut) {
      setCheckoutFrom(parseAbsoluteToLocal(dayjs(`1-1-1 ${checkOut.split('-')[0]}`).toISOString()));
      setCheckoutTo(parseAbsoluteToLocal(dayjs(`1-1-1 ${checkOut.split('-')[1]}`).toISOString()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
    <FormProvider {...method}>
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
          <div className="grid grid-cols-3 gap-3 pt-2">
            <Controller
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Select
                  selectedKeys={value === undefined ? undefined : [value]}
                  onChange={(e) => onChange(e.target.value)}
                  isRequired
                  label="Pricing Currency"
                  placeholder=" "
                  isInvalid={!!error}
                  errorMessage={error?.message}
                >
                  {currencies.slice(1).map(({ name, code }) => (
                    <SelectItem key={code}>{`${name} (${code})`}</SelectItem>
                  ))}
                </Select>
              )}
              name="currency"
            />
            <Controller
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Select
                  selectedKeys={value === undefined ? undefined : [value ? 'Yes' : 'No']}
                  onChange={(e) => onChange(e.target.value === 'Yes')}
                  label="Should we accept payment on your behalf?"
                  placeholder=" "
                  isInvalid={!!error}
                  errorMessage={error?.message}
                >
                  <SelectItem key="Yes">Yes</SelectItem>
                  <SelectItem key="No">No</SelectItem>
                </Select>
              )}
              name="proxyPaymentEnabled"
              defaultValue={true}
            />
            <Controller
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Select
                  selectedKeys={[!!value ? 'Yes' : 'No']}
                  onChange={(e) => onChange(e.target.value === 'Yes' ? defaultCancelPolicy : null)}
                  label="Is there a cancellation policy?"
                  placeholder=" "
                  isInvalid={!!error}
                  errorMessage={error?.message}
                >
                  <SelectItem key="Yes">Yes</SelectItem>
                  <SelectItem key="No">No</SelectItem>
                </Select>
              )}
              name="cancellationPolicy"
            />
          </div>
          {!!watch('cancellationPolicy') && (
            <div className="grid grid-cols-2 gap-4">
              <Controller
                control={control}
                render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
                  <Input
                    name="daysFromReservation"
                    label="Number of days from check-in date"
                    placeholder=" "
                    type="number"
                    isRequired
                    value={value?.toString() || ''}
                    onValueChange={(val) => /^\d*$/.test(val) && onChange(+val)}
                    onKeyDown={(e) => onEnter(e, () => setFocus('cancellationPolicy.percentRefundable'))}
                    isInvalid={!!error}
                    errorMessage={error?.message}
                    ref={ref}
                    className="text-accentGray"
                  />
                )}
                name="cancellationPolicy.daysFromReservation"
              />
              <Controller
                control={control}
                render={({ field: { onChange, ref, value }, fieldState: { error } }) => (
                  <Input
                    name="percentRefundable"
                    label="Percentage of reservation refundable"
                    placeholder=" "
                    type="number"
                    isRequired
                    value={value ? (value * 100).toString() : ''}
                    onValueChange={(val) => /^\d*$/.test(val) && onChange(+val / 100)}
                    isInvalid={!!error}
                    errorMessage={error?.message}
                    ref={ref}
                    className="text-accentGray"
                  />
                )}
                name="cancellationPolicy.percentRefundable"
              />
            </div>
          )}
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
                className="pt-2"
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
          <StringArrayInput
            arr={paymentMethods || []}
            label="Service Style"
            placeholder="e.g. Fast-food, Drive-through"
            prevState={paymentMethods || []}
            setState={setPaymentMethod}
          />
          <Button
            className="text-sm font-semibold px-14 py-6 my-6"
            color="primary"
            radius="full"
            variant="solid"
            onPress={() => onSubmit()}
            isLoading={isLoading}
          >
            Update Stay
          </Button>
        </div>
      </div>
    </FormProvider>
  );
};

export default UpdateStayRules;
