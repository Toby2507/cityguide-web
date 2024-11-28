'use client';

import { airtimeNetworks } from '@/data';
import { VtuPurchaseType } from '@/schemas';
import { getVtuSavedReceivers } from '@/server';
import { ISPs, VTUType } from '@/types';
import { onEnter } from '@/utils';
import etisalat from '@icons/9mobile.svg';
import airtel from '@icons/airtel.svg';
import glo from '@icons/glo.svg';
import mtn from '@icons/mtn.svg';
import { Button, Image, Input } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import AirtimeReceivers from './receivers';

interface Props {
  type: VTUType;
  goNext: () => void;
}

const AirtimePurchaseReceiver = ({ type, goNext }: Props) => {
  const { data: savedReceivers } = useQuery({
    queryKey: ['vtu-receivers'],
    queryFn: getVtuSavedReceivers,
  });
  const { control, setFocus, setValue, trigger, watch } = useFormContext<VtuPurchaseType>();
  const [showSaved, setShowSaved] = useState<boolean>(false);

  const network = watch('network');
  const StartContent = useMemo(() => {
    let image = airtel;
    if (network === ISPs.MTN) image = mtn;
    if (network === ISPs.GLO) image = glo;
    if (network === ISPs.ETISALAT) image = etisalat;
    return (
      <Image
        src={image.src}
        width="full"
        height={image.height}
        alt={network}
        removeWrapper
        radius="none"
        className="h-14 w-14"
      />
    );
  }, [network]);

  const toggleShowSaved = () => {
    if (!savedReceivers?.length) return toast.error('No saved receiver');
    setShowSaved(!showSaved);
  };
  const handleSelect = (id: string) => {
    const savedReceiver = savedReceivers?.find((r) => r._id === id);
    if (savedReceiver) {
      const { firstName, lastName, phoneNumber, network } = savedReceiver;
      setValue('firstName', firstName);
      setValue('lastName', lastName);
      setValue('phoneNumber', phoneNumber);
      setValue('network', network);
    }
    setShowSaved(false);
  };
  const handleNext = async () => {
    const isValid = await trigger(['firstName', 'lastName', 'network', 'phoneNumber']);
    if (!isValid) return;
    goNext();
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-20">
        <h1 className="text-xl font-semibold">Add VTU Purchase Receiver</h1>
        <Button color="secondary" variant="flat" radius="sm" size="sm" onPress={toggleShowSaved}>
          {showSaved ? 'Hide' : 'Show'} saved receivers
        </Button>
      </div>
      {showSaved ? <AirtimeReceivers handleSelect={handleSelect} extraTableClass="!max-h-[31vh]" /> : null}
      {!watch('network') ? (
        <div className="grid grid-cols-4 gap-2">
          {airtimeNetworks.map(({ value, label, color, icon }) => (
            <div
              key={value}
              style={{ backgroundColor: color }}
              className="flex flex-col gap-2 rounded-lg px-6 py-8 cursor-pointer"
              onClick={() => setValue('network', value)}
            >
              <Image src={icon.src} width="full" height={icon.height} alt={label} removeWrapper className="h-16 w-16" />
              <p className={`text-lg ${value === ISPs.ETISALAT ? 'text-black' : 'text-white'} font-medium`}>
                {label} {type}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="container mx-auto max-w-3xl flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <Controller
              control={control}
              render={({ field: { onBlur, onChange, ref, value }, fieldState: { error } }) => (
                <Input
                  name="first name"
                  label="First Name"
                  placeholder=" "
                  isRequired
                  radius="sm"
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
                  radius="sm"
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
            <div className="flex items-center gap-2">
              {StartContent}
              <Controller
                control={control}
                render={({ field: { onBlur, onChange, ref, value }, fieldState: { error } }) => (
                  <Input
                    name="last name"
                    label="Phone number"
                    placeholder=" "
                    isRequired
                    radius="sm"
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
            onPress={handleNext}
            radius="full"
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default AirtimePurchaseReceiver;
