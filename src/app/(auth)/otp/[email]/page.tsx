'use client';

import { OtpForm } from '@/containers';
import Link from 'next/link';
import PinInput from 'react-pin-input';

interface IOtpPage {
  params: {
    email: string;
  };
}

const OtpPage = ({ params: { email } }: IOtpPage) => {
  console.log(email);
  const [domain, rest] = email.split('%40');
  const hiddenEmail = `${domain.slice(0, 2)}${'*'.repeat(domain.slice(2).length)}@${rest}`;
  return (
    <div>
      <h2 className="text-xl text-black font-bold pb-2">OTP Verification</h2>
      <p className="text-sm text-accentGray font-medium pb-6">
        Enter OTP code sent to <span className="text-primary">{hiddenEmail}</span>
      </p>
      <OtpForm />
    </div>
  );
};

export default OtpPage;
