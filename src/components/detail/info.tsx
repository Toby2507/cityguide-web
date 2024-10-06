import { IPartner } from '@/types';
import { CiParking1 } from 'react-icons/ci';
import { HiLanguage } from 'react-icons/hi2';
import { IoLocationOutline } from 'react-icons/io5';

interface Props {
  amenities: string[];
  language?: string[];
  partner?: string | IPartner;
  summary: string;
}
const StayDetailInfo = ({ amenities, language, partner, summary }: Props) => {
  const parking = amenities?.find((amenity) => amenity.toLowerCase().includes('parking'));
  const summaries = summary.split('\n').filter(Boolean);
  const partnerObj = typeof partner === 'string' ? null : partner;
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <div className="col-span-3 flex flex-col gap-2">
        {summaries.slice(0, 3).map((text, idx) => (
          <p key={idx}>{text}</p>
        ))}
      </div>
      <aside className="flex flex-col gap-2 h-full">
        {partnerObj ? (
          <div className="flex flex-col border rounded-lg p-2">
            <h6 className="text-xs">Establishment</h6>
            <p className="text-sm font-semibold capitalize">
              {partnerObj.name ?? `${partnerObj.firstName} ${partnerObj.lastName}`}
            </p>
          </div>
        ) : null}
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
          {language ? (
            <p className="flex gap-1 text-xs">
              <HiLanguage size={20} />
              <span>Languages: {language.join(', ')}</span>
            </p>
          ) : null}
        </div>
      </aside>
    </div>
  );
};

export default StayDetailInfo;
