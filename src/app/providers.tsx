import {
  AuthProvider,
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
        <SearchStoreProvider>
          <ReservationStoreProvider>
            <SocketProvider>
              <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
            </SocketProvider>
          </ReservationStoreProvider>
        </SearchStoreProvider>
      </AuthProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
