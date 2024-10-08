'use client';

import { EstablishmentSignupForm, UserSignupForm } from '@/containers';
import { Tab, Tabs } from '@nextui-org/react';
import { useState } from 'react';

interface Props {
  referer: string;
}

const SignUpTab = ({ referer }: Props) => {
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
        <UserSignupForm referer={referer} />
      </Tab>
      <Tab key="establishment" title="Sign Up as an Establishment">
        <EstablishmentSignupForm referer={referer} />
      </Tab>
    </Tabs>
  );
};

export default SignUpTab;
