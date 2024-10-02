import { EngagementType, IAnalytics, IUser } from '@/types';
import { Avatar, Chip } from '@nextui-org/react';
import Link from 'next/link';

const EngagementCard = ({ type, href, user }: IAnalytics['engagements'][0]) => {
  const { firstName, lastName, imgUrl } = user as IUser;
  return (
    <div className="flex items-center gap-2">
      <Avatar src={imgUrl ? imgUrl : undefined} className="w-16 h-16" />
      <div className="flex flex-col">
        <Chip
          size="sm"
          className={`${type === EngagementType.REVIEW ? 'text-primary' : 'text-white'} text-[10px]`}
          color={type === EngagementType.CANCELLED ? 'danger' : type === EngagementType.NEW ? 'success' : 'secondary'}
        >
          {type}
        </Chip>
        <p className="text-base font-semibold">
          {firstName} {lastName}
        </p>
        {href ? (
          <Link href={href}>
            <p className="text-[10px] font-light underline">View Engagement</p>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default EngagementCard;
