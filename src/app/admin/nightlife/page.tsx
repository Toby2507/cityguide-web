import { AdminNightlifeList } from '@/containers';
import { getPartnerNightlifes, getUser } from '@/server';
import { EntityType } from '@/types';
import { paths } from '@/utils';
import { Button } from '@nextui-org/react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { redirect, RedirectType } from 'next/navigation';
import { FiPlus } from 'react-icons/fi';

const AdminNightlifeListPage = async () => {
  const user = await getUser();
  if (user?.type !== EntityType.ESTABLISHMENT) redirect(paths.admin(), RedirectType.replace);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['nightlifes', 'admin'],
    queryFn: getPartnerNightlifes,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-20">
            <h2 className="text-xl font-semibold">Nightlife Properties</h2>
            <Link href={paths.createNightlife()}>
              <Button className="text-primary text-sm font-semibold" color="secondary" radius="full" size="sm">
                <FiPlus />
                Add New
              </Button>
            </Link>
          </div>
        </div>
        <AdminNightlifeList />
      </section>
    </HydrationBoundary>
  );
};

export default AdminNightlifeListPage;
