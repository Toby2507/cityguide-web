'use client';

import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface IProviders {
  children: React.ReactNode;
}

const Providers = ({ children }: IProviders) => {
  const router = useRouter();
  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
    </SessionProvider>
  );
};

export default Providers;
