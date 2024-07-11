import { testimonial } from '@/data';
import { Image } from '@nextui-org/react';

const ListPropertyTestimonials = () => {
  return (
    <section id="reach" className="bg-bgGray py-16">
      <div className="container flex flex-col gap-10 px-10 mx-auto max-w-7xl">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-semibold capitalize">Meet a few of our users</h2>
          <p className="text-sm text-accentGray">See why they love renting out their properties on Cityguidex</p>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {testimonial.map(({ img, name, content, location }, i) => (
            <div key={i} className="bg-white flex flex-col gap-4 items-center justify-center rounded-xl p-4">
              <Image src={img.src} width={img.width} height={img.height} alt={name} />
              <p className="text-sm text-accentGray text-center font-light mx-auto w-10/12">{content}</p>
              <div className="">
                <h4 className="font-semibold">{name}</h4>
                <p className="text-sm text-accentGray text-center font-light">{location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ListPropertyTestimonials;
