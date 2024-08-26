import { IStay } from '@/types';
import { Button } from '@nextui-org/react';
import Link from 'next/link';

interface Props {
  stay: IStay;
  isAdmin?: boolean;
}

const StayDetailInfoReview = ({ stay: { extraInfo }, isAdmin }: Props) => {
  if (!extraInfo) return null;
  return (
    <section className="flex flex-col gap-4 pb-10" id="inforeview">
      <header className="flex items-center justify-between gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold capitalize">Area info</h1>
          <p className="flex items-center gap-1 text-sm text-accentGray font-medium">What&apos;s nearby?</p>
        </div>
        {!isAdmin ? (
          <Link href="#availability">
            <Button color="primary" className="px-10 font-semibold" radius="sm">
              See Availability
            </Button>
          </Link>
        ) : null}
      </header>
      <div className="grid grid-cols-3 gap-4">
        {extraInfo.neighborhood?.locations?.map(({ name, distance }) => (
          <div className="flex items-center justify-between gap-4" key={name}>
            <p className="text-sm">{name}</p>
            <p className="text-sm">{distance}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StayDetailInfoReview;
