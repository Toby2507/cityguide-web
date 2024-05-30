import { paths } from '@/utils';
import { IOffers } from '@/utils/interfaces';
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import Link from 'next/link';

const PlaceCard = ({ id, name, description, imgUrl }: IOffers) => {
  return (
    <article className="basis-1/3 px-2 py-2">
      <Card shadow="none" className="grid grid-rows-2">
        <CardBody className="p-0">
          <Image
            src={imgUrl.src}
            alt={name}
            width="full"
            height={224}
            radius="none"
            isZoomed
            className="h-56 w-full object-cover"
          />
        </CardBody>
        <CardFooter className="flex flex-col items-start justify-between border border-accentGray2/50 px-6 pb-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-xs font-normal">{description}</p>
          </div>
          <Link href={paths.details(id)}>
            <p className="text-xs text-primary font-semibold hover:underline">See more {' >'}</p>
          </Link>
        </CardFooter>
      </Card>
    </article>
  );
};

export default PlaceCard;
