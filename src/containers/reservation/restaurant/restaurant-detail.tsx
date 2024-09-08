'use client';

import { IRestaurant } from '@/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
const RestaurantDetailReservation = ({}: IRestaurant) => {
  return (
    <section className="flex flex-col gap-2">
      {/* Propery Details */}
      <article className="flex flex-col gap-3 border-2 rounded-xl p-3">
        {/* <div className="flex items-center gap-2">
          <Chip size="sm" className="text-sm" color="primary" radius="sm" variant="flat">
            <span className="text-xs font-medium tracking-wider">{type}</span>
          </Chip>
          {hotelRating && <CustomStars size={16} value={hotelRating} />}
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold tracking-wide">{name}</h3>
          <p className="text-sm font-medium leading-tight">{validAddr}</p>
        </div>
        <RatingCard rating={rating} reviewCount={reviewCount} reversed />
        <div className="flex flex-wrap items-center gap-2">
          {amenities.slice(0, 5).map((name, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <IoCheckmark size={16} />
              <p className="text-xs font-medium">{name}</p>
            </div>
          ))}
        </div> */}
      </article>
    </section>
  );
};

export default RestaurantDetailReservation;
