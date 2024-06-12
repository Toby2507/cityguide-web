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
  const [{ errors }, action] = useFormState(createUser, { errors: {} });
  return (
    <form action={action}>
      <div className="flex flex-col gap-4">
        <Input
          name="firstName"
          label="First Name"
          labelPlacement="outside"
          placeholder=" "
          radius="full"
          isInvalid={!!errors.firstName}
          errorMessage={errors.firstName}
          className="text-accentGray"
        />
        <Input
          name="lastName"
          label="Last Name"
          labelPlacement="outside"
          placeholder=" "
          radius="full"
          isInvalid={!!errors.lastName}
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
          isInvalid={!!errors.email}
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
          isInvalid={!!errors.phoneNumber}
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
          isInvalid={!!errors.password}
          errorMessage={errors.password}
          className="text-accentGray"
        />
        <div className="flex items-center justify-between gap-4">
          <Checkbox color="primary" classNames={{ label: 'text-accentGray' }} size="sm">
            Remember me
          </Checkbox>
        </div>
        {errors?._form ? <p className="text-red-400 bg-red-200 py-2">{errors._form}</p> : null}
        <SubmitForm>Log In</SubmitForm>
      </div>
      <Spacer y={8} />
      <SocialAuth isSignUp />
    </form>
  );
};

export default UserSignupForm;
