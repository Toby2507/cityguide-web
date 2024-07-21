import { IStay } from '@/types';
import { CiParking1 } from 'react-icons/ci';
import { IoLocationOutline } from 'react-icons/io5';

interface IProps {
  stay: IStay;
}
const StayDetailInfo = ({ stay: { amenities, summary } }: IProps) => {
  const parking = amenities?.find((amenity) => amenity.toLowerCase().includes('parking'));
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <p className="col-span-3">{summary}</p>
      <aside className="flex flex-col gap-2 h-full">
        <div className="flex items-center border rounded-lg">
          <div className="flex flex-col p-2">
            <h6 className="text-xs">Establishment</h6>
            <p className="text-sm font-semibold capitalize">Eko Real Estate</p>
          </div>
        </div>
        <div className="flex flex-col bg-secondary/50 gap-2 rounded-lg p-3 h-full">
          <h4 className="text-lg font-semibold">Property Highlight</h4>
          <p className="flex gap-1 text-xs">
            <IoLocationOutline size={20} />
            <span>Top location: Highly rated by recent guests (8.9)</span>
          </p>
          {parking ? (
            <p className="flex items-center gap-1 text-xs capitalize">
              <CiParking1 size={20} />
              <span>{parking} Available On Site</span>
            </p>
          ) : null}
        </div>
      </aside>
    </div>
  );
};

export default StayDetailInfo;
