import { HeaderNav, ServiceNav } from '@/components';

const Header = () => {
  return (
    <div className="bg-transparent">
      <div className="container mx-auto px-4 pt-2 max-w-7xl flex flex-col justify-center">
        <HeaderNav />
        <ServiceNav />
      </div>
    </div>
  );
};

export default Header;
