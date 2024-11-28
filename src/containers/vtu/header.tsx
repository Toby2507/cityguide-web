import { HeaderAuth, ServiceNav } from '@/components';
import { getUser } from '@/server';
import { paths } from '@/utils';
import logo from '@icons/logo.svg';
import { Image } from '@nextui-org/react';
import Link from 'next/link';

const AirtimeHeader = async () => {
  const user = await getUser();
  return (
    <div className="absolute left-0 right-0 bg-brandBlue flex items-center justify-between px-16 py-3 z-50">
      <Link href={paths.home()} className="font-bold text-2xl text-white">
        <Image src={logo.src} width="full" height={logo.height} alt="logo" removeWrapper className="object-contain" />
      </Link>
      <ServiceNav />
      <HeaderAuth user={user} />
    </div>
  );
};

export default AirtimeHeader;
