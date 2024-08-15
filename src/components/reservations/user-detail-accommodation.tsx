import { IAccommodation, IGuests } from '@/types';
import { FaChildren, FaPeopleArrows } from 'react-icons/fa6';
import { IoIosHome } from 'react-icons/io';
import { IoFastFoodOutline } from 'react-icons/io5';
import { LuBaby, LuParkingCircle } from 'react-icons/lu';
import { PiBathtub } from 'react-icons/pi';
import { TbMeterSquare } from 'react-icons/tb';

interface Props {
  details: IAccommodation;
  quantity: number;
  guests: IGuests;
}

const UserDetailReservationAccommodation = ({ details, guests, quantity }: Props) => {
  const accommodationDetails = [
    { title: 'bathrooms', value: `${details.bathrooms} bathrooms`, Icon: PiBathtub },
    {
      title: 'children',
      value: details.children ? 'Children allowed' : 'Children not allowed',
      Icon: FaChildren,
    },
    { title: 'infants', value: details.infants ? 'Infants allowed' : 'Infants not allowed', Icon: LuBaby },
    { title: 'parking', value: `${details.parking} parking`, Icon: LuParkingCircle },
    { title: 'size', value: `${details.size} m²`, Icon: TbMeterSquare },
    {
      title: 'breakfast',
      value: !!details.breakfast ? (details.breakfast.price ? 'Paid' : 'Free') : 'No',
      Icon: IoFastFoodOutline,
    },
  ];
  return (
    <article className="flex flex-col gap-4 border-2 rounded-xl px-6 py-4" key={details.id}>
      <h3 className="text-lg font-bold tracking-wide">{details.name}</h3>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <IoIosHome size={20} />
          <p className="text-sm">
            <span className="font-bold">{quantity}</span> of this accommodation is reserved
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FaPeopleArrows size={20} />
          <p className="text-sm">
            <span className="font-bold">Guests: </span>
            {guests.adults} adult(s) {guests.children ? `and ${guests.children} child(ren)` : ''}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 pt-2">
        {accommodationDetails.map(({ title, value, Icon }) => (
          <div key={title} className="flex items-center gap-1 border border-black rounded-md p-2">
            <Icon color="text-default" size={16} />
            <p className="text-xs font-light">{value}</p>
          </div>
        ))}
      </div>
      <ul className="flex flex-col">
        {details.rooms.map((room, idx) => (
          <li key={idx}>
            <span className="text-xs font-semibold">{room.name}: </span>
            <span className="text-[10px]">
              {room.furnitures.map((bed) => `${bed.count} ${bed.type} bed`).join(', ')}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default UserDetailReservationAccommodation;
