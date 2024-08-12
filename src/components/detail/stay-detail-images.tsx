'use client';

import { IStay } from '@/types';
import { Button, Image, useDisclosure } from '@nextui-org/react';
import ImageModal from '../common/image-modal';

const StayDetailImages = ({ images, avatar, name, hotelRating, accommodation }: IStay) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="col-span-6 grid grid-cols-subgrid grid-rows-6 auto-rows-[100px] gap-2">
      <ImageModal
        isOpen={isOpen}
        name={name}
        hotelRating={hotelRating}
        images={images}
        avatar={avatar}
        accommodation={accommodation}
        onOpenChange={onOpenChange}
      />
      <figure className="rounded-lg overflow-hidden col-span-2 row-span-2 h-48">
        <Image
          src={images[0]}
          width="full"
          alt="stay"
          height={224}
          radius="none"
          isZoomed
          removeWrapper
          className="object-cover h-full w-full"
          onClick={onOpen}
        />
      </figure>
      <figure className="rounded-lg overflow-hidden col-span-4 row-span-4 h-[24.5rem]">
        <Image
          src={avatar}
          width="full"
          alt="avatar"
          height={224}
          radius="none"
          isZoomed
          removeWrapper
          className="object-cover h-full w-full"
          onClick={onOpen}
        />
      </figure>
      {images?.slice(1, 4).map((img, i) => (
        <figure key={i} className="rounded-lg overflow-hidden col-span-2 row-span-2 h-48">
          <Image
            src={img}
            width="full"
            alt="stay"
            height={100}
            radius="none"
            isZoomed
            removeWrapper
            className="object-cover h-full w-full"
            onClick={onOpen}
          />
        </figure>
      ))}
      <figure className="relative rounded-lg overflow-hidden col-span-2 row-span-2 h-48">
        <Image
          src={images[4]}
          width="full"
          alt="stay"
          height={100}
          radius="none"
          isZoomed
          removeWrapper
          className="object-cover h-full w-full"
        />
        <div className="absolute grid place-items-center w-full h-full top-0 left-0 bg-black/40 z-10">
          <Button className="text-base text-white" size="sm" variant="light" onPress={onOpen}>
            + {images.length - 5} photos
          </Button>
        </div>
      </figure>
    </div>
  );
};

export default StayDetailImages;
