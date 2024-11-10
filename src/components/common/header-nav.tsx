import { getCurrencies, getUser } from '@/server';
import { paths } from '@/utils';
import { Button, Image, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react';
import Link from 'next/link';
import { MdOutlineContactSupport } from 'react-icons/md';
import HeaderAuth from '../misc/header-auth';
import logo from '@icons/logo.svg';
import CurrencySelector from '../home/currency';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

interface IHeaderNav {
  noList?: boolean;
  noAuth?: boolean;
}

const HeaderNav = async ({ noList, noAuth }: IHeaderNav) => {
  const queryClient = new QueryClient();

  const [user] = await Promise.all([
    getUser(),
    queryClient.prefetchQuery({
      queryKey: ['currencies'],
      queryFn: getCurrencies,
      staleTime: 1000 * 60 * 60 * 24,
    }),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Navbar position="static" className="bg-transparent" isBlurred={false} maxWidth="full">
        <NavbarBrand>
          <Link href={paths.home()} className="font-bold text-2xl text-white">
            <Image
              src={logo.src}
              width="full"
              height={logo.height}
              alt="logo"
              removeWrapper
              className="object-contain"
            />
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <CurrencySelector />
          </NavbarItem>
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
    </HydrationBoundary>
  );
};

export default HeaderNav;
