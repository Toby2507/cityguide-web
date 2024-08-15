import { getUser } from '@/server/queries/auth';
import { paths } from '@/utils';
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import Link from 'next/link';
import { MdOutlineContactSupport } from 'react-icons/md';
import HeaderAuth from '../misc/header-auth';

interface IHeaderNav {
  noList?: boolean;
  noAuth?: boolean;
}

const HeaderNav = async ({ noList, noAuth }: IHeaderNav) => {
  const user = await getUser();
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
        {!noList ? (
          <NavbarItem>
            <Button variant="light" radius="sm">
              {user?.isPartner ? (
                <Link href={paths.admin()} className="font-semibold text-sm text-white">
                  Manage Properties
                </Link>
              ) : (
                <Link href={paths.listProperty()} className="font-semibold text-sm text-white">
                  List Property
                </Link>
              )}
            </Button>
          </NavbarItem>
        ) : null}
        {!noAuth ? (
          <NavbarItem>
            <NavbarContent justify="end">
              <HeaderAuth user={user} />
            </NavbarContent>
          </NavbarItem>
        ) : null}
      </NavbarContent>
    </Navbar>
  );
};

export default HeaderNav;
