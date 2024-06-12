'use client';

import { SubmitForm } from '@/components';
import { verifyOtp } from '@/server';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { StatefulPinInput } from 'react-input-pin-code';

const OtpForm = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [{ errors }, action] = useFormState(verifyOtp.bind(null, otp.join('')), { errors: {} });

  return (
    <form action={action} className="flex items-center flex-col gap-12 pt-8">
      <StatefulPinInput
        length={6}
        autoFocus
        onChange={(_, __, val) => setOtp(val as string[])}
        containerClassName="gap-2"
        focusBorderColor="#0075FF"
        inputClassName="!h-14 !w-14 !rounded-xl shadow-xl"
        placeholder=""
      />
      <div className="flex items-center gap-2">
        {errors?._form ? (
          <p className="text-red-400 text-center bg-red-50 py-2 px-4 rounded-xl border border-red-400 text-xs">
            {errors._form}
          </p>
        ) : null}
        <p className="text-accentGray text-sm font-medium">Didn&apos;t receive OTP Code?</p>
        <button className="text-primary text-sm font-semibold" type="button">
          Resend Code
        </button>
      </div>
      <SubmitForm>Verify Code</SubmitForm>
    </form>
  );
};

export default OtpForm;

const styles = {
  inputBox: {
    border: 'none',
    borderRadius: '10px',
    marginRight: '15px',
    boxShadow: '0 0 10px 2px rgba(0, 0, 0, 0.1)',
    width: '60px',
    height: '60px',
    fontSize: '1.75rem',
    fontWeight: 'normal',
    color: '#898888',
  },
  inputBoxFocus: {
    border: 'none',
    boxShadow: '0 0 10px 2px rgba(0, 117, 255, .3)',
  },
};
