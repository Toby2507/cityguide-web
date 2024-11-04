import { HeaderNav, ServiceNav } from '@/components';
import { paths } from '@/utils';
import bannerImg from '@images/airtime-banner.png';
import { Button, Image } from '@nextui-org/react';
import Link from 'next/link';
import { LuArrowUpRightFromCircle } from 'react-icons/lu';

const AirtimeHero = () => {
  return (
    <div>
      <div className="relative container mx-auto px-4 pt-3 max-w-7xl flex flex-col justify-center pb-12 overflow-hidden">
        <HeaderNav />
        <ServiceNav />
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <h1 className="text-7xl text-white font-semibold">Airtime & Internet</h1>
              <h1 className="text-7xl text-transparent font-semibold bg-clip-text bg-gradient-linear w-fit">
                Purchase
              </h1>
            </div>
            <p className="text-lg text-white font-normal">
              We offer quick, seamless way to top up airtime and internet data for various service providers.{' '}
            </p>
            <div className="flex flex-col gap-3 w-7/12">
              <Link href={paths.login('airtime')}>
                <Button
                  className="bg-gradient-linear text-white px-20 py-6 w-full"
                  endContent={<LuArrowUpRightFromCircle color="#FFF" />}
                  radius="full"
                >
                  Get started now
                </Button>
              </Link>
              <Link href="#info">
                <Button className="bg-transparent text-white px-20 py-6 border border-white w-full" radius="full">
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid justify-center">
            <div className="relative">
              <div className="bg-gradient-linear w-96 h-96 rounded-full" />
              <Image
                src={bannerImg.src}
                width="full"
                height={bannerImg.height}
                alt="A person holding a phone"
                removeWrapper
                className="absolute -bottom-14 left-0 right-0 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirtimeHero;
