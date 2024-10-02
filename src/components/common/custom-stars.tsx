import { HotelRating } from '@/types';
import { Button } from '@nextui-org/react';
import { IoStar, IoStarOutline } from 'react-icons/io5';

interface Props {
  value?: HotelRating;
  onChange?: (val: string | HotelRating) => void;
  size?: number;
}

const CustomStars = ({ value, size, onChange }: Props) => {
  const rateArray = Object.values(HotelRating).filter((i) => Number(i));
  return (
    <div className={`flex items-center ${onChange ? 'gap-4' : 'gap-1'}`}>
      {rateArray.map((rating) => {
        const isActive = +rating <= (value || 0);
        return (
          <div key={rating}>
            {onChange ? (
              <Button
                key={rating}
                aria-label={`rating-${rating}`}
                isIconOnly
                radius="sm"
                variant="light"
                onPress={() => onChange(rating)}
              >
                {isActive ? (
                  <IoStar className="text-5xl text-accentGold" />
                ) : (
                  <IoStarOutline className="text-5xl text-accentGold" />
                )}
              </Button>
            ) : (
              <>
                {isActive ? (
                  <IoStar size={size || 20} className="text-xl text-accentGold" />
                ) : (
                  <IoStarOutline size={size || 20} className="text-xl text-accentGold" />
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CustomStars;
