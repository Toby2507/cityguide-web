import { ratingRank } from '@/utils';

interface Props {
  rating: number;
  reviewCount: number;
  reversed?: boolean;
}

const RatingCard = ({ rating, reviewCount, reversed }: Props) => {
  return (
    <div className="flex items-center justify-end gap-2">
      <div className={`flex flex-col ${reversed ? 'items-start' : 'items-end'}`}>
        <p className="text-primary font-bold">{ratingRank(rating, reviewCount)}</p>
        <p className="text-xs text-accentGray font-medium">
          {reviewCount} review{reviewCount === 1 ? '' : 's'}
        </p>
      </div>
      <p
        className={`bg-primary p-3 rounded-t-lg text-white text-xl ${
          reversed ? 'order-first rounded-ee-lg' : 'rounded-es-lg'
        }`}
      >
        {rating.toFixed(1)}
      </p>
    </div>
  );
};

export default RatingCard;
