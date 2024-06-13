'use client';

import { SubmitForm } from '@/components';
import { createUser } from '@/server';
import { Checkbox, Input, Spacer } from '@nextui-org/react';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import SocialAuth from './social-auth';

const UserSignupForm = () => {
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
  const [typingFields, setTypingFields] = useState<string[]>([]);
  let [{ errors }, action] = useFormState(createUser, { errors: {} });
  const setTyping = (val: string) => {
    if (!typingFields.includes(val)) setTypingFields([...typingFields, val]);
  };
  const isTyping = (val: string) => typingFields.includes(val);
  return (
    <form action={action} onSubmit={() => setTypingFields([])}>
      <div className="flex flex-col gap-4">
        <Input
          name="firstName"
          label="First Name"
          labelPlacement="outside"
          placeholder=" "
          radius="full"
          onValueChange={() => setTyping('first')}
          isInvalid={!isTyping('first') && !!errors.firstName}
          errorMessage={errors.firstName}
          className="text-accentGray"
        />
        <Input
          name="lastName"
          label="Last Name"
          labelPlacement="outside"
          placeholder=" "
          radius="full"
          onValueChange={() => setTyping('last')}
          isInvalid={!isTyping('last') && !!errors.lastName}
          errorMessage={errors.lastName}
          className="text-accentGray"
        />
        <Input
          name="email"
          label="Email Address"
          labelPlacement="outside"
          placeholder=" "
          radius="full"
          type="email"
          onValueChange={() => setTyping('email')}
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
          isInvalid={!isTyping('phone') && !!errors.phoneNumber}
          errorMessage={errors.phoneNumber}
          className="text-accentGray"
        />
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
      <Spacer y={8} />
      <SocialAuth isSignUp />
    </form>
  );
};

export default UserSignupForm;
