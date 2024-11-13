import { MenuItemCard } from '@/components';
import { IMenu } from '@/types';
import { Button } from '@nextui-org/react';

interface Props {
  menu: IMenu[];
  currency: string;
  onUpdate?: () => void;
}

const RestaurantDetailMenu = ({ menu, currency, onUpdate }: Props) => {
  return (
    <section className="flex flex-col gap-4 pb-10" id="menu">
      <header className="flex items-center justify-between gap-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold capitalize">Menu</h1>
          <p className="flex items-center gap-1 text-sm text-accentGray font-medium">
            What&apos;s on the menu? Check out our offerings
          </p>
        </div>
        {onUpdate ? (
          <Button color="primary" className="px-10 font-semibold" onPress={onUpdate} radius="sm">
            Update Menu
          </Button>
        ) : null}
      </header>
      <div className="grid grid-cols-2 gap-4">
        {menu.map((menu) => (
          <MenuItemCard key={menu.id} {...menu} currency={currency} />
        ))}
      </div>
    </section>
  );
};

export default RestaurantDetailMenu;
