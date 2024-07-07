'use client';

import { EstablishmentSignupForm, UserSignupForm } from '@/containers';
import { Tab, Tabs } from '@nextui-org/react';
import { useState } from 'react';

const SignUpTab = () => {
  const [type, setType] = useState<string>('user');

  return (
    <Tabs
      aria-label="signup type (user | establishment)"
      selectedKey={type}
      onSelectionChange={(key) => setType(key as string)}
      color="primary"
      className="self-center"
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
  );
};

export default SignUpTab;
