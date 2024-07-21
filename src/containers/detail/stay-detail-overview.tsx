import { StayDetailImages, StayDetailInfo } from '@/components';
import { IStay } from '@/types';
import avatar from '@images/detail-avatar.png';
import img1 from '@images/detail-image-1.png';
import img2 from '@images/detail-image-2.png';
import img3 from '@images/detail-image-3.png';
import img4 from '@images/detail-image-4.png';
import img5 from '@images/detail-image-5.png';
import mapBanner from '@images/map-banner.png';
import { Button, Divider, User } from '@nextui-org/react';
import NextImage from 'next/image';
import { IoLocation, IoShareSocialOutline } from 'react-icons/io5';
import { MdFavoriteBorder } from 'react-icons/md';

const images = [img1.src, img2.src, img3.src, img4.src, img5.src];
interface IProps {
  stay: IStay;
}

const StayDetailOverview = ({ stay }: IProps) => {
  return (
    <section className="flex flex-col gap-4 pb-10" id="overview">
      <header className="flex items-center justify-between gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold capitalize">{stay.name}</h1>
          <p className="flex items-center gap-1 text-sm text-accentGray font-medium">
            <IoLocation color="#0075FF" size={20} />
            {stay.address.fullAddress}
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
        <StayDetailImages images={images} avatar={avatar.src} />
        <aside className="col-span-2 flex flex-col gap-3">
          <article className="flex flex-col gap-3 px-2 py-3 rounded-lg border">
            <div className="flex items-center justify-end gap-2">
              <div className="flex flex-col items-end">
                <p className="text-primary font-bold">Exceptional</p>
                <p className="text-xs text-accentGray font-medium">500 reviews</p>
              </div>
              <p className="bg-primary p-3 rounded-ee-lg rounded-t-lg text-white text-xl">7.7</p>
            </div>
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
      <StayDetailInfo stay={stay} />
    </section>
  );
};

export default StayDetailOverview;
