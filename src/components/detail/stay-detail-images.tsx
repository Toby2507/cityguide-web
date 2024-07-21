import { Image } from '@nextui-org/react';

interface IProps {
  avatar: string;
  images?: string[];
}

const StayDetailImages = ({ images, avatar }: IProps) => {
  let avatarDim = '',
    imagesDim = '',
    initImgDim = '';
  if (!images?.length) avatarDim = 'col-span-6 row-span-6';
  if ((images?.length || 0) >= 1) {
    avatarDim = 'col-span-4 row-span-6';
    initImgDim = 'col-span-2 row-span-6';
  }
  if ((images?.length || 0) >= 2) {
    initImgDim = 'col-span-2 row-span-3 h-72';
    imagesDim = 'col-span-2 row-span-3 h-72';
  }
  if ((images?.length || 0) >= 3) {
    avatarDim = 'col-span-4 row-span-4 h-[24.5rem]';
    initImgDim = 'col-span-2 row-span-4';
    imagesDim = 'col-span-3 row-span-2 h-48';
  }
  if ((images?.length || 0) >= 4) imagesDim = 'col-span-2 row-span-2 h-48';
  if ((images?.length || 0) >= 5) initImgDim = 'col-span-2 row-span-2 h-48';
  return (
    <div className="col-span-6 grid grid-cols-subgrid grid-rows-6 auto-rows-[100px] gap-2">
      {images?.length ? (
        <figure className={`rounded-lg overflow-hidden ${initImgDim}`}>
          <Image
            src={images[0]}
            width="full"
            alt="stay"
            height={224}
            radius="none"
            isZoomed
            removeWrapper
            className="object-cover h-full w-full"
          />
        </figure>
      ) : null}
      <figure className={`rounded-lg overflow-hidden ${avatarDim}`}>
        <Image
          src={avatar}
          width="full"
          alt="avatar"
          height={224}
          radius="none"
          isZoomed
          removeWrapper
          className="object-cover h-full w-full"
        />
      </figure>
      {images?.slice(1).map((img, i) => (
        <figure key={i} className={`rounded-lg overflow-hidden ${imagesDim}`}>
          <Image
            src={img}
            width="full"
            alt="stay"
            height={100}
            radius="none"
            isZoomed
            removeWrapper
            className="object-cover h-full w-full"
          />
        </figure>
      ))}
    </div>
  );
};

export default StayDetailImages;
