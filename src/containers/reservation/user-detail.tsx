'use client';

import { IUserDetails } from '@/types';
import { paths } from '@/utils';
import { User } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PiUserLight } from 'react-icons/pi';

interface Props {
  user: IUserDetails | null;
}

const UserDetailReservation = ({ user }: Props) => {
  const pathname = usePathname();
  return (
    <section className="flex flex-col gap-2">
      <article className="flex flex-col gap-3 border-2 rounded-xl p-3">
        {user ? (
          <div className="flex items-center justify-start">
            <User
              as="div"
              name={<p className="text-primary text-xs font-semibold pl-1">{user.fullName}</p>}
              description={<p className="text-xs pl-1">{user.email}</p>}
              avatarProps={{ isBordered: true, src: user.imgUrl || '', color: 'primary', size: 'sm' }}
            />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <PiUserLight className="text-primary" size={24} />
            <p className="text-sm">
              <Link className="text-primary" href={paths.login(pathname)}>
                Log in
              </Link>
              &nbsp;to continue with your saved details or&nbsp;
              <Link className="text-primary" href={paths.register(pathname)}>
                register
              </Link>
              &nbsp;to manage your reservations on the go.
            </p>
          </div>
        )}
      </article>
    </section>
  );
};

export default UserDetailReservation;
