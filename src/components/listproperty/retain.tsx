import { Image } from '@nextui-org/react';
import retainImg from '@images/listing-retain.png';
import { HiOutlineCheckCircle } from 'react-icons/hi2';
import { retain } from '@/data';

const ListPropertyRetain = () => {
  return (
    <section id="reach" className="bg-bgGray py-16">
      <div className="container flex flex-col gap-10 px-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-2 items-center gap-10">
          <div className="flex flex-col gap-6">
            <h2 className="text-large font-bold">Get quaility bookings</h2>
            <div className="flex flex-col gap-6">
              {retain.map((q, i) => (
                <div key={i} className="flex items-start gap-4">
                  <HiOutlineCheckCircle className="relative text-2xl top-[2px]" />
                  <p className="flex-1 text-lg font-normal">{q}</p>
                </div>
              ))}
            </div>
          </div>
          <Image
            isZoomed
            src={retainImg.src}
            width={retainImg.width}
            height={retainImg.height}
            alt="Dubai cityscape with a view of the Burj Khalifa and the Dubai Fountain"
          />
        </div>
      </div>
    </section>
  );
};

export default ListPropertyRetain;
