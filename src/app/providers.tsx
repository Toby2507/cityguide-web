'use client';

import {
  AuthProvider,
  GeneralStoreProvider,
  PropertyStoreProvider,
  ReactQueryProvider,
  ReservationStoreProvider,
  SearchStoreProvider,
  SocketProvider,
} from '@/providers';
import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

interface IProviders {
  children: React.ReactNode;
}

const Providers = ({ children }: IProviders) => {
  const router = useRouter();

  return (
    <ReactQueryProvider>
      <AuthProvider>
        <GeneralStoreProvider>
          <SearchStoreProvider>
            <ReservationStoreProvider>
              <PropertyStoreProvider>
                <SocketProvider>
                  <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
                </SocketProvider>
              </PropertyStoreProvider>
            </ReservationStoreProvider>
          </SearchStoreProvider>
        </GeneralStoreProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
