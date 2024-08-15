'use client';

import { Map, SubmitForm } from '@/components';
import { createEstablishment } from '@/server';
import { IAddress } from '@/types';
import { Checkbox, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from '@nextui-org/react';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { IoEye, IoEyeOff, IoLocation } from 'react-icons/io5';

interface Props {
  referer: string;
}

const EstablishmentSignupForm = ({ referer }: Props) => {
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
  const [typingFields, setTypingFields] = useState<string[]>([]);
  const [address, setAddress] = useState<IAddress | null>(null);
  const [data, action] = useFormState(createEstablishment.bind(null, address!), { errors: {} });
  const errors = data?.errors || [];

  const handleSubmit = (payload: FormData) => {
    payload.append('redirectUrl', referer);
    return action(payload);
  };

  const setTyping = (val: string) => {
    if (!typingFields.includes(val)) setTypingFields([...typingFields, val]);
  };
  const isTyping = (val: string) => typingFields.includes(val);

  return (
    <form action={handleSubmit} onSubmit={() => setTypingFields([])}>
      <div className="flex flex-col gap-4">
        <Input
          name="name"
          label="Name"
          labelPlacement="outside"
          placeholder=" "
          radius="full"
          isRequired
          onValueChange={() => setTyping('name')}
          isInvalid={!isTyping('name') && !!errors.name}
          errorMessage={errors.name}
          className="text-accentGray"
        />
        <Textarea
          name="description"
          label="Description"
          labelPlacement="outside"
          placeholder=" "
          radius="full"
          onValueChange={() => setTyping('last')}
          isInvalid={!isTyping('last') && !!errors.description}
          errorMessage={errors.description}
          className="text-accentGray"
          minRows={1}
        />
        <Input
          name="email"
          label="Email Address"
          labelPlacement="outside"
          placeholder=" "
          radius="full"
          type="email"
          onValueChange={() => setTyping('email')}
          isRequired
          isInvalid={!isTyping('email') && !!errors.email}
          errorMessage={errors.email}
          className="text-accentGray"
        />
        <Input
          name="phoneNumber"
          label="Phone Number"
          labelPlacement="outside"
          placeholder=" "
          radius="full"
          type="tel"
          onValueChange={() => setTyping('phone')}
          isRequired
          isInvalid={!isTyping('phone') && !!errors.phoneNumber}
          errorMessage={errors.phoneNumber}
          className="text-accentGray"
        />
        <Popover>
          <PopoverTrigger>
            <Input
              name="addresss"
              label="Business Address"
              labelPlacement="outside"
              endContent={<IoLocation className="text-2xl text-danger pointer-events-none" />}
              placeholder=" "
              radius="full"
              onValueChange={() => setTyping('phone')}
              isReadOnly
              isRequired
              value={address?.fullAddress}
              isInvalid={!isTyping('phone') && !!errors.address}
              errorMessage={errors.address}
              className="text-accentGray cursor-pointer"
            />
          </PopoverTrigger>
          <PopoverContent className="w-full">
            <div className="flex flex-col gap-4 w-full">
              <h2 className="text-3xl font-semibold">Set Business Address</h2>
              <Map prevAddr={address} setAddr={(addr) => setAddress(addr)} />
            </div>
          </PopoverContent>
        </Popover>
        <Input
          name="password"
          label="Password"
          labelPlacement="outside"
          endContent={
            <button className="focus:outline-none" type="button" onClick={() => setIsPassVisible(!isPassVisible)}>
              {isPassVisible ? (
                <IoEye className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <IoEyeOff className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isPassVisible ? 'text' : 'password'}
          placeholder=" "
          radius="full"
          onValueChange={() => setTyping('password')}
          isRequired
          isInvalid={!isTyping('password') && !!errors.password}
          errorMessage={errors.password}
          className="text-accentGray"
        />
        <div className="flex items-center justify-between gap-4">
          <Checkbox color="primary" classNames={{ label: 'text-accentGray' }} size="sm">
            Remember me
          </Checkbox>
        </div>
        {errors?._form ? (
          <p className="text-red-400 text-center bg-red-50 py-2 px-4 rounded-xl border border-red-400 text-xs">
            {errors._form}
          </p>
        ) : null}
        <SubmitForm>Sign Up</SubmitForm>
      </div>
    </form>
  );
};

export default EstablishmentSignupForm;
