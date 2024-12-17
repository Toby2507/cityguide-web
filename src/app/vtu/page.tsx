import { Footer, VtuHero } from '@/containers';
import { airtimeData } from '@/data';
import { getUser } from '@/server';
import { paths } from '@/utils';
import heroImg from '@images/airtime-hero.png';
import infoBanner from '@images/airtime-info-banner.png';
import { Button, Image } from '@nextui-org/react';
import Link from 'next/link';
import { redirect, RedirectType } from 'next/navigation';
import { IoCellular } from 'react-icons/io5';
import { RiWifiFill } from 'react-icons/ri';

const AirtimePage = async () => {
  const user = await getUser();
  if (user) redirect(paths.vtuDashboard(), RedirectType.replace);
  return (
    <>
      <VtuHero />
      <main className="flex flex-col gap-14 bg-white pb-20">
        {/* Welcome secion */}
        <div className="bg-bgGray py-16">
          <div className="container px-10 mx-auto max-w-7xl flex flex-col gap-3">
            <h2 className="text-5xl text-center font-semibold">
              We Provide Awesome <span className="bg-gradient-linear bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-center text-lg mx-auto w-10/12">
              Making payments shouldn&apos;t be one of those difficult things. With Cityguidex, you may pay for the
              services you use from the convenience of your home or place of business. Complete convenience, quick
              service, and simple payment are all at your fingertips.
            </p>
          </div>
        </div>
        {/* Product section */}
        <div className="container mx-auto px-10 grid grid-cols-2 gap-10 max-w-7xl">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="grid place-items-center h-16 w-16 rounded-full bg-[#1A85FF]">
              <IoCellular size={30} color="#FFF" />
            </div>
            <h3 className="text-3xl font-semibold">Purchase Airtime</h3>
            <ul>
              <li className="text-xl text-center font-medium">Glo VTU</li>
              <li className="text-xl text-center font-medium">MTN VTU</li>
              <li className="text-xl text-center font-medium">Airtel VTU</li>
              <li className="text-xl text-center font-medium">9mobile VTU</li>
            </ul>
            <Link href={paths.login('vtu/dashboard')}>
              <Button className="bg-black text-white px-20 py-6" radius="full">
                Purchase
              </Button>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="grid place-items-center h-16 w-16 rounded-full bg-[#A259FF]">
                <RiWifiFill size={30} color="#FFF" />
              </div>
              <h3 className="text-3xl font-semibold">Purchase Internet</h3>
              <ul>
                <li className="text-xl text-center font-medium">Glo Data</li>
                <li className="text-xl text-center font-medium">MTN Data</li>
                <li className="text-xl text-center font-medium">Airtel Data</li>
                <li className="text-xl text-center font-medium">9mobile Data</li>
              </ul>
              <Link href={paths.login('vtu/dashboard')}>
                <Button className="bg-black text-white px-20 py-6" radius="full">
                  Purchase
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* How we do it */}
        <div id="info" className="bg-bgGray py-16">
          <div className="container px-10 mx-auto max-w-7xl flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-5xl text-center font-semibold">Why Cityguidex?</h2>
              <p className="text-center text-lg mx-auto w-9/12">
                Nigeria&apos;s leading payment platform, Cityguidex, offers millions of users a quick and simple way to
                make reservations online. By making sure that the daily services you receive are stress-free, we are
                changing lives. You can use any device to conduct speedy transactions with Cityguidex at any time or
                location.
              </p>
            </div>
            <div className="grid grid-cols-2 place-items-center gap-4">
              <Image
                src={heroImg.src}
                width="full"
                height={heroImg.height}
                alt="A group of people holding a phone"
                removeWrapper
                className="object-cover"
              />
              <div className="flex flex-col gap-3">
                {airtimeData.map(({ title, description }) => (
                  <div className="flex flex-col gap-1" key={title}>
                    <h3 className="text-2xl font-semibold">{title}</h3>
                    <p className="text-base">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Info Banner */}
        <div className="relative container mx-auto px-10 max-w-7xl z-50">
          <Image
            src={infoBanner.src}
            width="full"
            height={infoBanner.height}
            alt="Airtime info banner"
            removeWrapper
            className="object-contain z-0"
          />
          <div className="absolute left-24 bottom-10 flex items-center gap-2">
            <Button className="bg-transparent text-white h-16 w-52"></Button>
            <Button className="bg-transparent text-white h-16 w-52"></Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AirtimePage;
