import { SectionHeader } from '@/components';
import { PriceRange } from '@/types';
import { paths } from '@/utils';
import budgetImg from '@images/budget-restaurant-banner.jpg';
import moderateImg from '@images/moderate-restaurant-banner.jpg';
import fineImg from '@images/fine-restaurant-banner.jpg';
import { Card, CardFooter, Image } from '@nextui-org/react';
import Link from 'next/link';

const RestaurantCategories = () => {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Restaurant Categories"
        desc="From budget to fine dining, we have it all at various price range"
      />
      <div className="gap-2 grid grid-cols-3">
        <div className="col-span-1 h-[300px]">
          <Link href={paths.searchRestaurant([PriceRange.BUDGET])}>
            <Card isPressable className="w-full h-full">
              <Image
                isZoomed
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src={budgetImg.src}
              />
              <CardFooter className="absolute bg-gradient-to-t from-black/60 to-transparent pt-4 bottom-0 z-10">
                <h4 className="text-white font-medium text-3xl">Budget restaurant</h4>
              </CardFooter>
            </Card>
          </Link>
        </div>
        <div className="col-span-1 h-[300px]">
          <Link href={paths.searchRestaurant([PriceRange.MODERATE])}>
            <Card isPressable className="w-full h-full">
              <Image
                isZoomed
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src={moderateImg.src}
              />
              <CardFooter className="absolute bg-gradient-to-t from-black/60 to-transparent pt-4 bottom-0 z-10">
                <h4 className="text-white font-medium text-3xl">Moderate dining</h4>
              </CardFooter>
            </Card>
          </Link>
        </div>
        <div className="col-span-1 h-[300px]">
          <Link href={paths.searchRestaurant([PriceRange.FINE])}>
            <Card isPressable className="w-full h-full">
              <Image
                isZoomed
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover"
                src={fineImg.src}
              />
              <CardFooter className="absolute bg-gradient-to-t from-black/60 to-transparent pt-4 bottom-0 z-10">
                <h4 className="text-white font-medium text-3xl">Fine dining</h4>
              </CardFooter>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RestaurantCategories;
