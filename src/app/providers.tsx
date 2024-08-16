'use client';

import { ReservationStoreProvider, SearchStoreProvider } from '@/providers';
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
      <SearchStoreProvider>
        <ReservationStoreProvider>
          <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
        </ReservationStoreProvider>
      </SearchStoreProvider>
    </SessionProvider>
  );
};

export default Providers;
