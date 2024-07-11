import { Image } from '@nextui-org/react';
import qualityImg from '@images/listing-quality.png';
import { HiOutlineCheckCircle } from 'react-icons/hi2';
import { quality } from '@/data';

const ListPropertyQuality = () => {
  return (
    <section className="container px-10 py-20 mx-auto max-w-7xl">
      <div className="grid grid-cols-2 items-center gap-10">
        <Image
          isZoomed
          src={qualityImg.src}
          width={qualityImg.width}
          height={qualityImg.height}
          alt="Dubai cityscape with a view of the Burj Khalifa and the Dubai Fountain"
        />
        <div className="flex flex-col gap-6">
          <h2 className="text-large font-bold">Get quaility bookings</h2>
          <div className="flex flex-col gap-6">
            {quality.map((q, i) => (
              <div key={i} className="flex items-start gap-4">
                <HiOutlineCheckCircle className="relative text-2xl top-[2px]" />
                <p className="flex-1 text-lg font-normal">{q}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListPropertyQuality;
