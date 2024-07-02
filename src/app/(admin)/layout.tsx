import { AdminHeader } from '@/components';
import { AdminSidebar } from '@/containers';

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: Readonly<ILayout>) => {
  return (
    <div className="flex bg-white h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="px-8 pt-8 pb-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
