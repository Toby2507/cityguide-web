'use client';

import { savedReceiverSchema } from '@/schemas';
import { getVtuSavedReceivers, saveVTUReceiver } from '@/server';
import { ISavedReceiverForm, ISPs } from '@/types';
import { onEnter } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoIosArrowRoundBack } from 'react-icons/io';

interface Props {
  activeId: string;
  goBack: () => void;
}

const AddAirtimeReceiver = ({ activeId, goBack }: Props) => {
  const { data: savedReceivers } = useQuery({
    queryKey: ['vtu-receivers'],
    queryFn: getVtuSavedReceivers,
    enabled: !!activeId,
  });
  const queryclient = useQueryClient();
  const defaultValues = useMemo(
    () => (activeId ? savedReceivers?.find((receive) => receive._id === activeId) : undefined),
    [activeId, savedReceivers]
  );
  const { control, handleSubmit, setFocus } = useForm<ISavedReceiverForm>({
    mode: 'onChange',
    resolver: zodResolver(savedReceiverSchema),
    defaultValues,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit: SubmitHandler<ISavedReceiverForm> = async (data) => {
    setIsSubmitting(true);
    try {
      await saveVTUReceiver(data, activeId);
      toast.success('New receiver added');
      queryclient.invalidateQueries({ queryKey: ['vtu-receivers'] });
      goBack();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <Button
        startContent={<IoIosArrowRoundBack />}
        size="sm"
        variant="light"
        color="primary"
        className="w-fit pl-4 pr-6"
        onClick={goBack}
      >
        Back
      </Button>
      <div className="container mx-auto max-w-3xl flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">{activeId ? 'Edit' : 'Add new'} receiver</h2>
        <div className="flex flex-col gap-3">
          <Controller
            control={control}
            render={({ field: { onBlur, onChange, ref, value }, fieldState: { error } }) => (
              <Input
                name="first name"
                label="First Name"
                placeholder=" "
                isRequired
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                onKeyDown={(e) => onEnter(e, () => setFocus('lastName'))}
                isInvalid={!!error}
                errorMessage={error?.message}
                ref={ref}
                className="text-accentGray"
              />
            )}
            name="firstName"
          />
          <Controller
            control={control}
            render={({ field: { onBlur, onChange, ref, value }, fieldState: { error } }) => (
              <Input
                name="last name"
                label="Last Name"
                placeholder=" "
                isRequired
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                onKeyDown={(e) => onEnter(e, () => setFocus('phoneNumber'))}
                isInvalid={!!error}
                errorMessage={error?.message}
                ref={ref}
                className="text-accentGray"
              />
            )}
            name="lastName"
          />
          <div className="grid grid-cols-4 items-center gap-3">
            <Controller
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Select
                  selectedKeys={value === undefined ? undefined : [value]}
                  onChange={(e) => onChange(e.target.value)}
                  isRequired
                  label="Network"
                  placeholder=" "
                  isInvalid={!!error}
                  errorMessage={error?.message}
                >
                  <SelectItem key={ISPs.AIRTEL}>{ISPs.AIRTEL}</SelectItem>
                  <SelectItem key={ISPs.GLO}>{ISPs.GLO}</SelectItem>
                  <SelectItem key={ISPs.MTN}>{ISPs.MTN}</SelectItem>
                  <SelectItem key={ISPs.ETISALAT}>{ISPs.ETISALAT}</SelectItem>
                </Select>
              )}
              name="network"
            />
            <Controller
              control={control}
              render={({ field: { onBlur, onChange, ref, value }, fieldState: { error } }) => (
                <Input
                  name="last name"
                  label="Phone number"
                  placeholder=" "
                  isRequired
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  isInvalid={!!error}
                  errorMessage={error?.message}
                  ref={ref}
                  className="col-span-3 text-accentGray"
                />
              )}
              name="phoneNumber"
            />
          </div>
        </div>
        <Button
          className="bg-gradient-linear text-white text-base font-semibold px-20 py-6 mt-2 w-full"
          isLoading={isSubmitting}
          onPress={() => handleSubmit(onSubmit)()}
          radius="full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default AddAirtimeReceiver;
