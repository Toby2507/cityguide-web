import { AdminBreadcrumbs, AdminHeader } from '@/components';
import { AdminSidebar } from '@/containers';
import { getUser } from '@/server';
import { redirect } from 'next/navigation';

interface ILayout {
  children: React.ReactNode;
}

const Layout = async ({ children }: Readonly<ILayout>) => {
  const user = await getUser();
  if (!user || !user.isPartner) redirect('/');
  return (
    <div className="flex flex-col bg-white max-h-screen">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar type={user.type} />
        <main className="flex flex-col gap-2 px-8 pt-24 pb-4 h-screen overflow-y-auto w-full adminmain">
          <AdminBreadcrumbs />
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
