import avatar1 from '@images/testimonial-1.png';
import avatar2 from '@images/testimonial-2.png';
import avatar3 from '@images/testimonial-3.png';
import avatar4 from '@images/testimonial-4.png';
import { Image } from '@nextui-org/react';

const info = [
  {
    content:
      'CityGuideX was a lifesaver when planning my trip to Barcelona!  I found amazing restaurants and booked them all in advance, avoiding long wait times. It also helped me discover some hidden gem bars with great live music.',
    name: 'Sarah Jones',
    location: 'Seattle, WA',
    img: avatar1,
  },
  {
    content:
      'CityGuideX made our weekend getaway in Rome unforgettable. We booked a romantic dinner at a Michelin-starred restaurant and found the perfect nightclub to celebrate a special occasion.  Everything was seamless and stress-free.',
    name: 'Michael Rossi',
    location: 'Milan, Italy',
    img: avatar2,
  },
  {
    content:
      "I'm a solo traveler and CityGuideX made it so easy to find activities and nightlife options in a new city. I booked a pub crawl and met some great people, and also found a fantastic jazz bar with a relaxed atmosphere.",
    name: 'Emily Chen',
    location: 'Tokyo, Japan',
    img: avatar3,
  },
  {
    content:
      "CityGuideX is my go-to platform for booking all my travel reservations.  It's the only app I need to manage restaurants, bars, and even tours and activities. It saves me so much time and helps me discover unique experiences in every city I visit.",
    name: 'David Lee',
    location: 'London, UK',
    img: avatar4,
  },
];

const ListPropertyTestimonials = () => {
  return (
    <section id="reach" className="bg-bgGray py-16">
      <div className="container flex flex-col gap-10 px-10 mx-auto max-w-7xl">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-semibold capitalize">Meet a few of our users</h2>
          <p className="text-sm text-accentGray">See why they love renting out their properties on Cityguidex</p>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {info.map(({ img, name, content, location }, i) => (
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
