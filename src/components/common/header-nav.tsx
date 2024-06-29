import { getUser } from '@/server';
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import Link from 'next/link';
import { MdOutlineContactSupport } from 'react-icons/md';
import HeaderAuth from '../misc/header-auth';

const HeaderNav = async () => {
  const cookie = await getUser();
  return (
    <Navbar position="static" className="bg-primary" maxWidth="full">
      <NavbarBrand>
        <Link href="/" className="font-bold text-2xl text-white">
          CityGuideX
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button aria-label="help and about page" isIconOnly radius="sm" variant="light">
            <Link href="#" className="text-white">
              <MdOutlineContactSupport size={20} />
            </Link>
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button variant="light" radius="sm">
            <Link href="#" className="font-semibold text-sm text-white">
              List Property
            </Link>
          </Button>
        </NavbarItem>
        <NavbarItem>
          <NavbarContent justify="end">
            <HeaderAuth user={cookie} />
          </NavbarContent>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default HeaderNav;
