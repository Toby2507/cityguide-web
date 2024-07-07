'use client';

import { logout } from '@/server';
import { IUserDetails } from '@/types';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from '@nextui-org/react';

interface IHeaderAuth {
  user: IUserDetails | null;
}

const AdminUser = ({ user }: IHeaderAuth) => {
  if (!user) return null;
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <User as="button" name={user.fullName} avatarProps={{ color: 'primary', isBordered: true, src: user.imgUrl }} />
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
