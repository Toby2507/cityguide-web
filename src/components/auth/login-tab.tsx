'use client';

import { LoginForm } from '@/containers';
import { EntityType } from '@/types';
import { Tab, Tabs } from '@nextui-org/react';
import { useState } from 'react';

interface Props {
  referer: string;
}

const LoginTab = ({ referer }: Props) => {
  const [type, setType] = useState<EntityType>(EntityType.USER);

  return (
    <>
      <Tabs
        aria-label="signup type (user | establishment)"
        selectedKey={type}
        onSelectionChange={(key) => setType(key as EntityType)}
        color="primary"
        className="self-center"
        size="sm"
        radius="full"
      >
        <Tab key={EntityType.USER} title="Log in as a User" />
        <Tab key={EntityType.ESTABLISHMENT} title="Log in as an Establishment" />
      </Tabs>
      <LoginForm type={type} referer={referer} />
    </>
  );
};

export default LoginTab;
