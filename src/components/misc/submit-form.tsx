'use client';

import { Button } from '@nextui-org/react';
import { useFormStatus } from 'react-dom';

interface ISubmitForm {
  children: React.ReactNode;
}

const SubmitForm = ({ children }: ISubmitForm) => {
  const { pending } = useFormStatus();
  return (
    <Button className="text-sm font-semibold" color="primary" isLoading={pending} radius="full" size="lg" type="submit">
      {children}
    </Button>
  );
};

export default SubmitForm;
