import { SectionHeader } from '@/components';
import { NightLifeType } from '@/types';
import { paths } from '@/utils';
import barImg from '@images/bar-banner.jpg';
import { Card, CardFooter, Image } from '@nextui-org/react';
import Link from 'next/link';

const NightlifeCategories = () => {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader title="Nightlife Categories" desc="From bars to lounges, we have it all" />
      <div className="gap-2 grid grid-cols-3 grid-rows-2">
        <div className="col-span-1 h-[300px]">
          <Link href={paths.searchStay([NightLifeType.BAR])}>
            <Card isPressable className="w-full h-full">
              <Image
                isZoomed
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src={barImg.src}
              />
              <CardFooter className="absolute bg-gradient-to-t from-black/60 to-transparent pt-4 bottom-0 z-10">
                <h4 className="text-white font-medium text-3xl">Bar</h4>
              </CardFooter>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NightlifeCategories;
