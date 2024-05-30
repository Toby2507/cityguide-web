import { getUser } from '@/server';
import { IUserDetails } from '@/types';
import { paths } from '@/utils';
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, User } from '@nextui-org/react';
import Link from 'next/link';
import { MdOutlineContactSupport } from 'react-icons/md';

const HeaderNav = async () => {
  let cookie = await getUser();
  let user: IUserDetails | null = null;
  if (cookie) user = JSON.parse(cookie.value);
  console.log(user);
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
            {!!user ? (
              <User
                name={user.fullName ?? 'Toby Salau'}
                description={<Link href={paths.profile()}>View Profile</Link>}
                avatarProps={{ src: user.imgUrl }}
              />
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
          </NavbarContent>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default HeaderNav;
