import { SectionHeader } from '@/components';
import apartmentImg from '@images/apartment-banner.avif';
import bnbImg from '@images/bnb-banner.jpeg';
import hostelImg from '@images/hostel-banner.jpeg';
import hotelImg from '@images/hotel-banner.jpeg';
import resortImg from '@images/resort-banner.jpeg';
import { Card, CardFooter, Image } from '@nextui-org/react';

const StayCategories = () => {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader title="Stay Categories" desc="From hotels to resorts, we have it all" />
      <div className="gap-2 grid grid-cols-3 grid-rows-2">
        <Card isPressable className="col-span-2 h-[300px]">
          <Image
            isZoomed
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src={hotelImg.src}
          />
          <CardFooter className="absolute bg-gradient-to-t from-black/60 to-transparent pt-4 bottom-0 z-10">
            <h4 className="text-white font-medium text-3xl">Hotel</h4>
          </CardFooter>
        </Card>
        <Card isPressable className="col-span-1 h-[300px]">
          <Image
            isZoomed
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src={apartmentImg.src}
          />
          <CardFooter className="absolute bg-gradient-to-t from-black/60 to-transparent pt-4 bottom-0 z-10">
            <h4 className="text-white font-medium text-3xl">Apartment</h4>
          </CardFooter>
        </Card>
        <Card isPressable className="col-span-1 h-[300px]">
          <Image
            isZoomed
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src={hostelImg.src}
          />
          <CardFooter className="absolute bg-gradient-to-t from-black/60 to-transparent pt-4 bottom-0 z-10">
            <h4 className="text-white font-medium text-3xl">Hostel</h4>
          </CardFooter>
        </Card>
        <Card isPressable className="col-span-1 h-[300px]">
          <Image
            isZoomed
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src={resortImg.src}
          />
          <CardFooter className="absolute bg-gradient-to-t from-black/60 to-transparent pt-4 bottom-0 z-10">
            <h4 className="text-white font-medium text-3xl">Resort</h4>
          </CardFooter>
        </Card>
        <Card isPressable className="col-span-1 h-[300px]">
          <Image
            isZoomed
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src={bnbImg.src}
          />
          <CardFooter className="absolute bg-gradient-to-t from-black/60 to-transparent pt-4 bottom-0 z-10">
            <h4 className="text-white font-medium text-3xl">Bed n Breakfast</h4>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default StayCategories;
