import { getUser } from '@/server';
import { Badge, Button, Input, Link, Navbar, NavbarContent, NavbarItem } from '@nextui-org/react';
import { BsSearch } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa';
import AdminUser from './user';

const AdminHeader = async () => {
  const cookie = await getUser();
  return (
    <Navbar position="static" className="px-6 py-1 shadow-lg" maxWidth="full">
      <NavbarContent justify="start">
        <NavbarItem>
          <Input
            name="search"
            label="Search"
            labelPlacement="inside"
            radius="full"
            size="sm"
            endContent={
              <Button aria-label="search" className="my-auto -top-[1px]" isIconOnly radius="sm" variant="light">
                <BsSearch className="text-accentGray" size={20} />
              </Button>
            }
            classNames={{
              label: 'text-accentGray leading-snug pl-4',
              inputWrapper: 'bg-[#DFDFDF]',
            }}
            className="text-accentGray rounded-full w-[500px]"
          />
        </NavbarItem>
        <NavbarItem className="flex-1">
          <NavbarContent justify="end">
            <NavbarItem>
              <Button aria-label="notifications" isIconOnly radius="sm" variant="light">
                <Link href="admin" className="text-white">
                  <Badge content="" size="sm" color="danger">
                    <FaBell className="text-accentGray" size={24} />
                  </Badge>
                </Link>
              </Button>
            </NavbarItem>
            <AdminUser user={cookie} />
          </NavbarContent>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default AdminHeader;
