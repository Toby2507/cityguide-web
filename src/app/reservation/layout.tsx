import { HeaderNav } from '@/components';
import { Footer } from '@/containers';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const RestaurantReservationLayout = async ({ children }: Props) => {
  return (
    <div className="min-h-screen">
      <div className="bg-primary">
        <div className="container mx-auto px-4 pt-2 max-w-7xl">
          <HeaderNav noList />
        </div>
      </div>
      <div className="bg-white">
        <main className="container mx-auto flex flex-col justify-center gap-10 px-10 py-8 max-w-7xl">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantReservationLayout;
