'use client';

import { logout } from '@/server';
import { IUserDetails } from '@/types';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from '@nextui-org/react';

interface IHeaderUser {
  user: IUserDetails;
}

const HeaderUser = ({ user }: IHeaderUser) => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <User
          as="button"
          name={<p className="text-white text-sm font-semibold pl-2">{user.fullName}</p>}
          avatarProps={{ isBordered: true, src: user.imgUrl }}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user.email}</p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem onClick={() => logout()} key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default HeaderUser;
