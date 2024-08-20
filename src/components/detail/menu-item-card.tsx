import { IMenu } from '@/types';
import { numberToCurrency } from '@/utils';
import { Chip, Image } from '@nextui-org/react';

const MenuItemCard = ({ imgUrl, name, category, description, price, dietaryProvisions }: IMenu) => {
  return (
    <article className="grid grid-cols-10 gap-6 border rounded-xl p-3 bg-white shadow-xl">
      <figure className="h-full col-span-3 w-full">
        <Image
          src={imgUrl}
          width="full"
          alt={name}
          radius="none"
          className="w-full object-cover rounded-xl aspect-square"
        />
      </figure>
      <div className="col-span-7 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {category?.map((cat) => (
            <Chip size="sm" key={cat} className="text-[10px]" color="primary" variant="flat">
              <span className="text-xs font-medium tracking-wider">{cat}</span>
            </Chip>
          ))}
        </div>
        <h4 className="text-lg font-semibold tracking-wide">{name}</h4>
        <p className="flex-1 text-xs">{description}</p>
        {price ? <p className="text-2xl font-semibold">{numberToCurrency(price)}</p> : null}
        <p className="text-xs text-accentGray font-medium">{dietaryProvisions?.join(', ')}</p>
      </div>
    </article>
  );
};

export default MenuItemCard;
