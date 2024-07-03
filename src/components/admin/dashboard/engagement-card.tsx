import { EngagementType, IEngagement } from '@/types';
import { Avatar, Chip } from '@nextui-org/react';
import Link from 'next/link';

const EngagementCard = ({ id, type, imgUrl, name, href }: IEngagement) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar src={imgUrl} className="w-16 h-16" />
      <div className="flex flex-col">
        <Chip
          size="sm"
          className={`${type === EngagementType.REVIEW ? 'text-primary' : 'text-white'} text-[10px]`}
          color={type === EngagementType.CANCELLED ? 'danger' : type === EngagementType.NEW ? 'success' : 'secondary'}
        >
          {type}
        </Chip>
        <p className="text-base font-semibold">{name}</p>
        <Link href={href}>
          <p className="text-[10px] font-light underline">View Engagement</p>
        </Link>
      </div>
    </div>
  );
};

export default EngagementCard;
