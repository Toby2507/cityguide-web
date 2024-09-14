import { ratingRank } from '@/utils';

interface Props {
  rating: number;
  reviewCount: number;
  reversed?: boolean;
  bgColor?: string;
  textColor?: string;
  size?: 'sm' | 'md';
}

const RatingCard = ({ rating, reviewCount, reversed, textColor, bgColor, size = 'md' }: Props) => {
  if (!reviewCount) return null;
  return (
    <div className="flex items-center justify-end gap-2 min-w-fit">
      <div className={`flex flex-col ${reversed ? 'items-start' : 'items-end'}`}>
        <p className={`flex-1 ${textColor ?? 'text-primary'} ${size === 'md' ? 'text-base' : 'text-sm'} font-bold`}>
          {ratingRank(rating, reviewCount)}
        </p>
        <p className={`${size === 'md' ? 'text-xs' : 'text-[10px]'} text-accentGray font-medium`}>
          {reviewCount} review{reviewCount === 1 ? '' : 's'}
        </p>
      </div>
      <p
        className={`${bgColor ?? 'bg-primary'} rounded-t-lg text-white ${
          size === 'md' ? 'text-xl p-3' : 'text-base p-2'
        } ${reversed ? 'order-first rounded-ee-lg' : 'rounded-es-lg'}`}
      >
        {rating.toFixed(1)}
      </p>
    </div>
  );
};

export default RatingCard;
