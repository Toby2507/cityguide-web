import { HeaderNav, ServiceNav } from '@/components';

interface Props {
  noBottomSpace?: boolean;
}

const Header = ({ noBottomSpace }: Props) => {
  return (
    <div className="bg-transparent">
      <div
        className={`container mx-auto px-4 pt-2 max-w-7xl ${
          noBottomSpace ? 'pb-2' : 'pb-10'
        } flex flex-col justify-center`}
      >
        <HeaderNav />
        <ServiceNav />
      </div>
    </div>
  );
};

export default Header;
