'use client';

import { completePaymentSchema, CompletePaymentType } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, DatePicker, DateValue, Input } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface Props {
  reference: string;
  type: string;
  onClose: (data: Record<string, any>) => Promise<void>;
}

const CompletePayment = ({ reference, type, onClose }: Props) => {
  const { control, handleSubmit, setValue, watch } = useForm<CompletePaymentType>({
    mode: 'onChange',
    resolver: zodResolver(completePaymentSchema),
  });
  const [birthday, setBirthday] = useState<DateValue>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<CompletePaymentType> = async (data) => {
    setIsLoading(true);
    try {
      await onClose(data);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const onError: SubmitErrorHandler<CompletePaymentType> = (err) => {
    toast.error(!reference ? 'Invalid reference' : 'Please fill in required fields');
  };

  useEffect(() => {
    if (birthday) setValue('birthday', dayjs(birthday.toString()).toDate());
    console.log(watch());
  }, [birthday, setValue, watch]);
  useEffect(() => {
    setValue('reference', reference);
  }, [reference, setValue]);
  return (
    <div className="flex flex-col gap-4 px-2 py-4">
      <h3 className="text-lg font-semibold">Complete your payment</h3>
      <div className="flex flex-col gap-4">
        {type === 'send_pin' ? (
          <Controller
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <Input
                name="pin"
                label="PIN"
                placeholder=" "
                isRequired
                value={value}
                onBlur={onBlur}
                onValueChange={(val) => /^\d*$/.test(val) && onChange(val)}
                isInvalid={!!error}
                errorMessage={error?.message}
                className="text-accentGray"
              />
            )}
            name="pin"
          />
        ) : null}
        {type === 'send_otp' ? (
          <Controller
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <Input
                name="otp"
                label="OTP"
                placeholder=" "
                isRequired
                value={value}
                onBlur={onBlur}
                onValueChange={(val) => /^\d*$/.test(val) && onChange(val)}
                isInvalid={!!error}
                errorMessage={error?.message}
                className="text-accentGray"
              />
            )}
            name="otp"
          />
        ) : null}
        {type === 'send_phone' ? (
          <Controller
            control={control}
            render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
              <Input
                name="phone"
                label="Phone Number"
                placeholder=" "
                type="tel"
                isRequired
                value={value}
                onBlur={onBlur}
                onValueChange={onChange}
                isInvalid={!!error}
                errorMessage={error?.message}
                className="text-accentGray"
              />
            )}
            name="phone"
          />
        ) : null}
        {type === 'send_birthday' ? (
          <DatePicker label="Date of Birth" isRequired value={birthday} onChange={setBirthday} />
        ) : null}
        <Button
          color="primary"
          isLoading={isLoading}
          onPress={() => handleSubmit(onSubmit, onError)()}
          radius="sm"
          size="lg"
        >
          Complete Payment
        </Button>
      </div>
    </div>
  );
};

export default CompletePayment;
