'use client';

import { SubmitForm } from '@/components';
import { upgradeUser } from '@/server';
import { DatePicker, Input } from '@nextui-org/react';
import { useFormState } from 'react-dom';
import FormFooter from './form-footer';

const UpgradeToPartnerForm = () => {
  let [data, action] = useFormState(upgradeUser, { errors: {} });
  const errors = data?.errors || {};

  return (
    <form action={action} className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Input
          name="phoneNumber"
          label="Phone Number"
          labelPlacement="outside"
          placeholder=" "
          radius="full"
          type="tel"
          isInvalid={!!errors.phoneNumber}
          isRequired
          errorMessage={errors.phoneNumber}
          className="text-accentGray"
        />
        <DatePicker
          name="dob"
          label="Birth Date"
          labelPlacement="outside"
          radius="full"
          isRequired
          showMonthAndYearPickers
        />
        {errors?._form ? (
          <p className="text-red-400 text-center bg-red-50 py-2 px-4 rounded-xl border border-red-400 text-xs">
            {errors._form}
          </p>
        ) : null}
        <SubmitForm>Upgrage To Partner</SubmitForm>
      </div>
      <FormFooter noSocial />
    </form>
  );
};

export default UpgradeToPartnerForm;
