'use client';

import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount) => failureCount < 3,
        retryDelay: (retryCount) => Math.min(1000 * 2 ** retryCount, 30000),
        staleTime: 60 * 1000,
      },
    },
  });

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (isServer) return makeQueryClient();
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
};

export const ReactQueryProvider = ({ children }: Props) => {
  const queryClient = getQueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
