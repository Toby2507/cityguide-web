import { AdminStayList } from '@/containers';
import { getPartnerStays } from '@/server';
import { paths } from '@/utils';
import { Button } from '@nextui-org/react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';

const AdminStayListPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['stays', 'admin'],
    queryFn: getPartnerStays,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-20">
            <h2 className="text-xl font-semibold">Stay Properties</h2>
            <Link href={paths.createStay()}>
              <Button className="text-primary text-sm font-semibold" color="secondary" radius="full" size="sm">
                <FiPlus />
                Add New
              </Button>
            </Link>
          </div>
          <AdminStayList />
        </div>
      </section>
    </HydrationBoundary>
  );
};

export default AdminStayListPage;
