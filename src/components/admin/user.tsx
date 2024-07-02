'use client';

import { logout } from '@/server';
import { IUserDetails } from '@/types';
import { paths } from '@/utils';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, User } from '@nextui-org/react';
import React from 'react';

interface IHeaderAuth {
  user: IUserDetails;
}

const AdminUser = ({ user }: IHeaderAuth) => {
  if (!user?.id) return null;
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <User
          as="button"
          name={user.fullName}
          description={
            <Link href={paths.profile()}>
              <p className="text-xs text-primary underline">View Profile</p>
            </Link>
          }
          avatarProps={{ color: 'primary', isBordered: true, src: user.imgUrl }}
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
  );
};

export default AdminUser;
