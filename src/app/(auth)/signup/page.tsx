'use client';

import { EstablishmentSignupForm, UserSignupForm } from '@/containers';
import { paths } from '@/utils';
import { Tab, Tabs } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';

const SignUpPage = () => {
  const [type, setType] = useState<string>('user');
  return (
    <div>
      <h2 className="text-xl text-black font-bold pb-2">Log In to your account</h2>
      <p className="text-sm text-accentGray font-medium pb-6">
        Already have an account?
        <Link className="text-primary font-bold hover:underline" href={paths.login()}>
          {' '}
          Sign In
        </Link>
      </p>
      <Tabs
        aria-label="signup type (user | establishment)"
        selectedKey={type}
        onSelectionChange={(key) => setType(key as string)}
        color="primary"
        size="sm"
        radius="full"
      >
        <Tab key="user" title="Sign Up as a User">
          <UserSignupForm />
        </Tab>
        <Tab key="establishment" title="Sign Up as an Establishment">
          <EstablishmentSignupForm />
        </Tab>
      </Tabs>
    </div>
  );
};

export default SignUpPage;
