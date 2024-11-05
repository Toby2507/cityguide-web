'use client';

import { airtimeNav } from '@/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import appleIcon from '@icons/apple.svg';
import googlePlayIcon from '@icons/google-play.svg';
import footerImg from '@images/airtime-sidebar-footer.png';
import { Image } from '@nextui-org/react';

const AirtimeDashboardSidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="bg-bgGray flex flex-col justify-between pt-28 h-screen w-[28rem]">
      <nav className="flex flex-col h-full">
        {airtimeNav.map(({ title, href }, idx) => {
          const isActive = pathname === href;
          return (
            <Link href={href} key={title}>
              <div
                className={`${
                  !isActive
                    ? `text-black ${!idx ? 'border-y' : 'border-b'} border-gray-300`
                    : `text-white bg-gradient-linear`
                } py-4`}
              >
                <p className="text-base text-center font-medium">{title}</p>
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="grid grid-cols-2 bg-brandBlue p-4">
        <Image
          src={footerImg.src}
          width="full"
          height={footerImg.height}
          alt="Footer image"
          removeWrapper
          className="absolute left-0 bottom-0"
        />
        <div />
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 border-2 border-white rounded-xl p-2">
            <Image
              src={appleIcon.src}
              width="full"
              height={appleIcon.height}
              alt="Apple store icon"
              removeWrapper
              className="h-8 w-8"
              radius="none"
            />
            <div className="flex flex-col">
              <p className="text-[8px] text-white font-medium">Download on the</p>
              <p className="text-base text-white font-semibold">App Store</p>
            </div>
          </div>
          <div className="flex items-center gap-2 border-2 border-white rounded-xl p-2">
            <Image
              src={googlePlayIcon.src}
              width="full"
              height={googlePlayIcon.height}
              alt="Google play store icon"
              removeWrapper
              className="h-8 w-8"
              radius="none"
            />
            <div className="flex flex-col">
              <p className="text-[8px] text-white font-medium">Get it on</p>
              <p className="text-base text-white font-semibold">Google Play</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AirtimeDashboardSidebar;
