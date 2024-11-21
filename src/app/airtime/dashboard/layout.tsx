import { AirtimeHeader, AirtimeSidebar } from '@/containers';
import { getVtuSavedReceivers, getVtuTransactions } from '@/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';

interface IProps {
  children: React.ReactNode;
}

const AirtimeLayout = async ({ children }: Readonly<IProps>) => {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['vtu-receivers'],
      queryFn: getVtuSavedReceivers,
    }),
    queryClient.prefetchQuery({
      queryKey: ['vtu-transactions'],
      queryFn: getVtuTransactions,
    }),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="relative bg-white max-h-screen">
        <AirtimeHeader />
        <div className="flex">
          <AirtimeSidebar />
          <main className="px-10 pt-28 pb-4 h-screen overflow-y-auto w-full adminmain">{children}</main>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default AirtimeLayout;
