import { MenuItemCard } from '@/components';
import { IMenu } from '@/types';

interface Props {
  menu: IMenu[];
}

const RestaurantDetailMenu = ({ menu }: Props) => {
  return (
    <section className="flex flex-col gap-4 pb-10" id="availability">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold capitalize">Menu</h1>
        <p className="flex items-center gap-1 text-sm text-accentGray font-medium">
          What&apos;s on the menu? Check out our offerings
        </p>
      </header>
      <div className="grid grid-cols-2 gap-4">
        {menu.map((menu) => (
          <MenuItemCard key={menu.id} {...menu} />
        ))}
      </div>
    </section>
  );
};

export default RestaurantDetailMenu;
