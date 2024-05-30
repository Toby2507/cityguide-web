'use client';

import { paths } from '@/utils';
import { IOffers } from '@/utils/interfaces';
import { Button, Card, CardBody } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

const OfferCard = ({ id, name, description, imgUrl, link }: IOffers) => {
  return (
    <Card radius="sm">
      <CardBody className="grid grid-cols-2 gap-6 p-2">
        <Image src={imgUrl} alt={name} className="h-full w-full rounded-s-md" />
        <div className="flex flex-col justify-between gap-6 py-3">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-xs font-medium text-accentGray w-9/12">{description}</p>
          </div>
          <Button className="text-sm font-semibold w-fit px-6" color="primary" radius="sm">
            <Link href={paths.offers(id)}>{link}</Link>
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default OfferCard;
