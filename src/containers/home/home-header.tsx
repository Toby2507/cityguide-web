import { HeaderNav, Hero, ServiceNav } from '@/components';

const HomeHeader = () => {
  return (
    <div className="bg-primary">
      <div className="container mx-auto px-4 pt-6 max-w-7xl flex flex-col justify-center pb-12">
        <HeaderNav />
        <ServiceNav />
        <Hero />
      </div>
    </div>
  );
};

export default HomeHeader;
