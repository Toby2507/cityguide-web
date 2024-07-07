import { HeaderNav } from '@/components';
import { paths } from '@/utils';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { LuArrowUpRightFromCircle } from 'react-icons/lu';

const ListPropertyHeader = () => {
  return (
    <div className="bg-primary">
      <div className="container mx-auto px-4 pt-2 max-w-7xl flex flex-col justify-center pb-12">
        <HeaderNav noList />
      </div>
      <div className="container mx-auto px-4 py-6 max-w-6xl bg-primary">
        <div className="flex flex-col gap-6 justify-center pb-10">
          <h1 className="text-white text-5xl font-semibold text-center leading-tight w-11/12 mx-auto">
            List your Properties
            <br />
            Apartments, Hotels, Resorts, Hostels and Bed n Breakfasts on CityGuideX
          </h1>
          <p className="text-white text-lg text-center max-w-screen-sm mx-auto">
            Whether you work as a full-time host or as a hobby, list your vacation rental on Booking.com to access a
            global clientele.
          </p>
          <Link className="max-w-fit mx-auto" href={paths.partner()}>
            <Button
              className="bg-white text-primary text-base font-semibold px-24 py-8 mt-4"
              endContent={<LuArrowUpRightFromCircle size={20} />}
              radius="full"
            >
              Get started now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListPropertyHeader;
