'use client';

import { logout } from '@/server';
import { IUserDetails } from '@/types';
import { paths } from '@/utils';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from '@nextui-org/react';
import Link from 'next/link';

interface IHeaderAuth {
  user: IUserDetails;
}

const HeaderAuth = ({ user }: IHeaderAuth) => {
  return (
    <>
      {user?.id ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <User
              as="button"
              name={user.fullName}
              description={<Link href={paths.profile()}>View Profile</Link>}
              avatarProps={{ isBordered: true, src: user.imgUrl }}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem onClick={() => logout()} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
