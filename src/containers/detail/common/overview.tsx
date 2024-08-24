import { DetailImages, DetailInfo, RatingCard } from '@/components';
import { IAccommodation, IAddress, Rating } from '@/types';
import { ratingRank } from '@/utils';
import mapBanner from '@images/map-banner.png';
import { Button, Divider, User } from '@nextui-org/react';
import NextImage from 'next/image';
import { IoLocation, IoShareSocialOutline } from 'react-icons/io5';
import { MdFavoriteBorder } from 'react-icons/md';

interface Props {
  name: string;
  address: IAddress;
  images: string[];
  avatar: string;
  amenities: string[];
  summary: string;
  rating: number;
  reviewCount: number;
  hotelRating?: Rating;
  accommodation?: IAccommodation[];
}

const DetailPageOverview = ({
  name,
  address,
  images,
  avatar,
  amenities,
  rating,
  reviewCount,
  hotelRating,
  accommodation,
  summary,
}: Props) => {
  return (
    <section className="flex flex-col gap-4 pb-10" id="overview">
      <header className="flex items-center justify-between gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold capitalize">{name}</h1>
          <p className="flex items-center gap-1 text-sm text-accentGray font-medium">
            <IoLocation color="#0075FF" size={20} />
            {address.fullAddress}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button isIconOnly variant="light">
            <IoShareSocialOutline color="#0075FF" size={30} />
          </Button>
          <Button isIconOnly variant="light">
            <MdFavoriteBorder color="#0075FF" size={30} />
          </Button>
        </div>
      </header>
      <div className="grid grid-cols-8 gap-3">
        <DetailImages
          images={images}
          avatar={avatar}
          name={name}
          hotelRating={hotelRating}
          accommodation={accommodation}
        />
        <aside className="col-span-2 flex flex-col gap-3">
          <article className="flex flex-col gap-3 px-2 py-3 rounded-lg border">
            <RatingCard rating={rating} reviewCount={reviewCount} />
            <Divider />
            <div className="flex flex-col items-start gap-4 px-2">
              <p className="text-xs">
                &ldquo;The apartment was very clean. The area was quiet and seem to be safe. The apartment staff the
                very diligent in sure that our Needs & Wants were met in a timely manner.&rdquo;
              </p>
              <User name="Jane Doe" avatarProps={{ isBordered: true }} />
            </div>
          </article>
          <div className="relative h-full flex items-end justify-center pb-4 rounded-lg">
            <NextImage
              src={mapBanner}
              alt="map"
              className="absolute top-0 bottom-0 left-0 right-0 w-full h-full rounded-lg object-cover"
            />
            <Button color="primary" className="px-12 font-semibold" radius="full">
              Go to map
            </Button>
          </div>
        </aside>
      </div>
      <DetailInfo amenities={amenities} summary={summary} />
    </section>
  );
};

export default DetailPageOverview;
