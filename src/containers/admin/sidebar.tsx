import { adminNav } from '@/data';
import Link from 'next/link';
import { RxCaretRight } from 'react-icons/rx';

const AdminSidebar = () => {
  const [mainNav, footNav] = [adminNav.slice(0, -2), adminNav.slice(-2)];
  return (
    <aside className="border-r border-default pt-20 w-64">
      <nav className="flex flex-col gap-14 h-full">
        <ul className="flex-1 flex flex-col px-4">
          {mainNav.map(({ Icon, href, title }, idx) => (
            <Link href={href} key={idx}>
              <li className="flex items-center gap-2 transition-all duration-500 ease-in-out py-3 hover:scale-105">
                <Icon className={`${!idx ? 'text-primary' : 'text-accentGray'}`} />
                <p className={`flex-1 ${!idx ? 'text-primary' : 'text-accentGray'} font-medium`}>{title}</p>
                <RxCaretRight className={`${!idx ? 'text-primary' : 'text-accentGray'} text-xl`} />
              </li>
            </Link>
          ))}
        </ul>
        <div className="bg-bgGray px-4 py-10">
          <ul className="flex flex-col gap-6">
            {footNav.map(({ Icon, href, title }, idx) => (
              <Link href={href} key={idx}>
                <li className="flex items-center gap-2">
                  <Icon className="text-accentGray" />
                  <p className="flex-1 text-accentGray font-medium">{title}</p>
                  <RxCaretRight className="text-accentGray text-xl" />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
