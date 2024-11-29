import { AdminBreadcrumbs, AdminHeader } from '@/components';
import { AdminSidebar } from '@/containers';
import { getCurrencies, getUser } from '@/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

interface ILayout {
  children: React.ReactNode;
}

const Layout = async ({ children }: Readonly<ILayout>) => {
  const queryClient = new QueryClient();
  const [user] = await Promise.all([
    getUser(),
    queryClient.prefetchQuery({
      queryKey: ['currencies'],
      queryFn: getCurrencies,
      staleTime: 1000 * 60 * 60 * 24,
    }),
  ]);
  if (!user || !user.isPartner) redirect('/');
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col bg-white max-h-screen">
        <AdminHeader user={user} />
        <div className="flex">
          <AdminSidebar type={user.type} />
          <main className="flex flex-col gap-2 px-8 py-24 h-screen overflow-y-auto w-full adminmain">
            <AdminBreadcrumbs />
            {children}
          </main>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Layout;
