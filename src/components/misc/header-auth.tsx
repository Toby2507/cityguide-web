'use client';

import { IUserDetails } from '@/types';
import { paths } from '@/utils';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HeaderUser from '../common/header-user';

interface IHeaderAuth {
  user: IUserDetails | null;
}

const HeaderAuth = ({ user }: IHeaderAuth) => {
  const name = usePathname();
  return (
    <>
      {user ? (
        <HeaderUser user={user} />
      ) : (
        <>
          <Link href={paths.login(name)}>
            <Button className="bg-white text-primary font-semibold" radius="sm" variant="solid">
              Log in
            </Button>
          </Link>
          <Link href={paths.register(name)}>
            <Button className="bg-secondary text-primary font-semibold" radius="sm" variant="solid">
              Register
            </Button>
          </Link>
        </>
      )}
    </>
  );
};

export default HeaderAuth;
