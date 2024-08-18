import { getUser } from '@/server';
import { Badge, Button, Input, Navbar, NavbarContent, NavbarItem } from '@nextui-org/react';
import Link from 'next/link';
import { BsSearch } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa';
import HeaderUser from '../common/header-user';
import { EntityType } from '@/types';
import { paths } from '@/utils';

const AdminHeader = async () => {
  const user = await getUser();
  return (
    <Navbar position="static" className="absolute px-6 shadow-lg bg-primary z-50" maxWidth="full">
      <NavbarContent justify="start">
        <Link href="/admin" className="font-bold text-2xl text-white">
          CityGuideX
        </Link>
      </NavbarContent>
      <NavbarContent justify="center">
        <Input
          name="search"
          label="Search"
          labelPlacement="inside"
          radius="full"
          size="sm"
          color="primary"
          endContent={
            <Button aria-label="search" className="my-auto -top-[1px]" isIconOnly radius="sm" variant="light">
              <BsSearch className="text-primary" size={20} />
            </Button>
          }
          classNames={{
            label: '!text-primary tracking-wide pl-4',
            input: 'pl-4 text-black text-sm font-medium',
          }}
          className="text-accentGray rounded-full w-[500px]"
        />
      </NavbarContent>
      <NavbarContent justify="end">
        {user?.type === EntityType.USER ? (
          <NavbarItem>
            <Button radius="sm" variant="bordered">
              <Link href={paths.home()} className="text-white">
                Exit Admin
              </Link>
            </Button>
          </NavbarItem>
        ) : null}
        <NavbarItem>
          <Button aria-label="notifications" isIconOnly radius="sm" variant="light">
            <Link href="admin" className="text-white">
              <Badge content="" size="sm" color="danger">
                <FaBell className="text-white" size={24} />
              </Badge>
            </Link>
          </Button>
        </NavbarItem>
        <HeaderUser user={user!} />
      </NavbarContent>
    </Navbar>
  );
};

export default AdminHeader;
