import { IStay } from '@/types';
import { paths } from '@/utils';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import Link from 'next/link';

const PlaceCard = ({ _id, name, summary, avatar }: IStay) => {
  return (
    <Card shadow="none" className="grid grid-rows-2">
      <CardBody className="p-0">
        <Image
          src={avatar}
          width="full"
          alt={name}
          height={224}
          radius="none"
          isZoomed
          className="h-56 w-full object-cover"
        />
      </CardBody>
      <CardFooter className="flex flex-col items-start justify-between border border-accentGray2/50 px-6 pb-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-xs font-normal">{summary.split('\n')[0]}</p>
        </div>
        <Link href={paths.stayDetail(_id)}>
          <p className="text-xs text-primary font-semibold hover:underline">See more {' >'}</p>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PlaceCard;
