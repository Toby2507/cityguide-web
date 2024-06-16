import avatar from '@images/detail-avatar.png';
import img1 from '@images/detail-image-1.png';
import img2 from '@images/detail-image-2.png';
import img3 from '@images/detail-image-3.png';
import img4 from '@images/detail-image-4.png';
import img5 from '@images/detail-image-5.png';
import { Image } from '@nextui-org/react';

const images = [img1, img2, img3, img4, img5];

const StayDetailImages = () => {
  return (
    <div className="col-span-3 grid grid-cols-subgrid grid-rows-3 auto-rows-[100px] gap-2">
      <figure className="col-span-1 row-span-1 h-48 rounded-lg overflow-hidden">
        <Image
          src={images[0].src}
          width="full"
          alt="stay"
          height={224}
          radius="none"
          isZoomed
          removeWrapper
          className="object-cover h-full w-full"
        />
      </figure>
      <figure className="col-span-2 row-span-2 h-[24.5rem] rounded-lg overflow-hidden">
        <Image
          src={avatar.src}
          width="full"
          alt="avatar"
          height={224}
          radius="none"
          isZoomed
          removeWrapper
          className="object-cover h-full w-full"
        />
      </figure>
      {images.slice(1).map((img, i) => (
        <figure key={i} className="col-span-1 row-span-1 h-48 rounded-lg overflow-hidden">
          <Image
            src={img.src}
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
