'use client';

import { IUserDetails } from '@/types';
import { paths } from '@/utils';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import HeaderUser from '../common/header-user';

interface IHeaderAuth {
  user: IUserDetails | null;
}

const HeaderAuth = ({ user }: IHeaderAuth) => {
  return (
    <>
      {user ? (
        <HeaderUser user={user} />
      ) : (
        <>
          <Link href={paths.login()}>
            <Button className="bg-white text-primary font-semibold" radius="sm" variant="solid">
              Log in
            </Button>
          </Link>
          <Link href={paths.register()}>
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
