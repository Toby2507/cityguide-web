'use client';

import { SubmitForm } from '@/components';
import { loginUser } from '@/server';
import { paths } from '@/utils';
import { Checkbox, Input, Spacer } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import SocialAuth from './social-auth';

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [{ errors }, action] = useFormState(loginUser, { errors: {} });
  return (
    <form action={action}>
      <div className="flex flex-col gap-4">
        <Input
          name="email"
          label="Email Address"
          labelPlacement="outside"
          placeholder=" "
          radius="full"
          size="lg"
          isInvalid={!!errors.email}
          errorMessage={errors.email}
          className="text-accentGray"
        />
        <Input
          name="password"
          label="Password"
          labelPlacement="outside"
          endContent={
            <button className="focus:outline-none" type="button" onClick={() => setIsVisible(!isVisible)}>
              {isVisible ? (
                <IoEye className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <IoEyeOff className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
          placeholder=" "
          radius="full"
          size="lg"
          isInvalid={!!errors.password}
          errorMessage={errors.password}
          className="text-accentGray"
        />
        <div className="flex items-center justify-between gap-4">
          <Checkbox color="primary" classNames={{ label: 'text-accentGray' }} size="sm">
            Remember me
          </Checkbox>
          <Link href={paths.forgotPassword()}>
            <p className="text-primary text-sm font-semibold">Forgot Password?</p>
          </Link>
        </div>
        {errors?._form ? <p className="text-red-400 bg-red-200 py-2">{errors._form}</p> : null}
        <SubmitForm>Log In</SubmitForm>
      </div>
      <Spacer y={8} />
      <SocialAuth />
    </form>
  );
};

export default LoginForm;
