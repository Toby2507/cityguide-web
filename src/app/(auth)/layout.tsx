import loginBanner from '@images/login-banner.png';
import Image from 'next/image';

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: Readonly<ILayout>) => {
  return (
    <div className="grid grid-cols-2 max-h-screen">
      <div className="flex flex-col gap-14 p-20">
        <h1 className="text-4xl font-bold text-primary">CityGuideX</h1>
        {children}
      </div>
      <Image className="w-full max-h-screen object-cover" alt="beatiful resort with sky blue pool" src={loginBanner} />
    </div>
  );
};

export default Layout;
