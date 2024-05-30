import { HeaderNav, Hero } from '@/components';

const Header = () => {
  return (
    <div className="bg-primary">
      <div className="container mx-auto px-4 pt-6 max-w-7xl flex flex-col justify-center pb-28">
        <HeaderNav />
        <Hero />
      </div>
    </div>
  );
};

export default Header;
