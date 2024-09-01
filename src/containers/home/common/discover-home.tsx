import { paths } from '@/utils';
import discoverImg from '@images/discover-main.png';
import { Button, Image, Spacer } from '@nextui-org/react';
import Link from 'next/link';

const DiscoverHome = () => {
  return (
    <section className="bg-bgGray py-16">
      <div className="container px-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-2 items-center">
          <Image
            isZoomed
            src={discoverImg.src}
            width={discoverImg.width}
            height={discoverImg.height}
            alt="Resort with a sky blue pool leading to the ocean"
          />
          <div className="flex flex-col">
            <div className="flex flex-col gap-2">
              <h2 className="text-large font-bold">
                Discover and Book <br />
                Your Perfect Getaway
              </h2>
              <p className="text-sm">
                Cityguidesx is your one-stop platform for hassle-free reservations at top outlets, hotels, villas,
                apartments, and restaurants. Explore a wide range of options and book your dream vacation with ease.
              </p>
            </div>
            <Spacer y={10} />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold">Easy Booking</h3>
                <p className="text-xs text-accentGray2">
                  Browse through our extensive collection of accommodations and dining options.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-bold">Exclusive Deals</h3>
                <p className="text-xs text-accentGray2">
                  Enjoy special offers and discounts on selected outlets, hotels, and restaurants.
                </p>
              </div>
            </div>
            <Spacer y={10} />
            <div className="flex items-center gap-6">
              <Button className="text-primary text-xs font-semibold" color="secondary">
                Learn more
              </Button>
              <Link href={paths.register()}>
                <Button color="primary">Register</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverHome;
