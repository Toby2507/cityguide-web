'use client';

import { SubmitForm } from '@/components';
import { loginUser } from '@/server';
import { EntityType } from '@/types';
import { paths } from '@/utils';
import { Checkbox, Input } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import FormFooter from './form-footer';

interface Props {
  referer: string;
  type: EntityType;
}

const LoginForm = ({ referer, type }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [data, action] = useFormState(loginUser, { errors: {} });
  const errors = data?.errors || {};

  const handleSubmit = (payload: FormData) => {
    payload.append('redirectUrl', referer);
    payload.append('type', type);
    return action(payload);
  };
  return (
    <form action={handleSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Input
          name="email"
          label="Email Address"
          labelPlacement="outside"
          placeholder=" "
          radius="full"
          isRequired
          isInvalid={!!errors?.email}
          errorMessage={errors?.email}
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
          isRequired
          isInvalid={!!errors?.password}
          errorMessage={errors?.password}
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
        {errors?._form ? (
          <p className="text-red-400 text-center bg-red-50 py-2 px-4 rounded-xl border border-red-400 text-xs">
            {errors._form}
          </p>
        ) : null}
        <SubmitForm>Log In</SubmitForm>
      </div>
      <FormFooter />
    </form>
  );
};

export default LoginForm;
