import { CurrencySelector, HeaderAuth, ServiceNav } from '@/components';
import { getCurrencies, getUser } from '@/server';
import { paths } from '@/utils';
import logo from '@icons/logo.svg';
import { Image } from '@nextui-org/react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import Link from 'next/link';

const AirtimeHeader = async () => {
  const queryClient = new QueryClient();
  const [user] = await Promise.all([
    getUser(),
    queryClient.prefetchQuery({
      queryKey: ['currencies'],
      queryFn: getCurrencies,
      staleTime: 1000 * 60 * 60 * 24,
    }),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="absolute left-0 right-0 bg-brandBlue flex items-center justify-between px-16 py-3 z-50">
        <Link href={paths.home()} className="font-bold text-2xl text-white">
          <Image src={logo.src} width="full" height={logo.height} alt="logo" removeWrapper className="object-contain" />
        </Link>
        <ServiceNav />
        <div className="flex items-center gap-4">
          <CurrencySelector />
          <HeaderAuth user={user} />
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default AirtimeHeader;
