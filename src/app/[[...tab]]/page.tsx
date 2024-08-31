import { paths } from '@/utils';
import { redirect, RedirectType } from 'next/navigation';

interface Props {
  params: {
    tab?: string[];
  };
}

const HomePage = ({ params: { tab } }: Props) => {
  if (tab && tab[0] === 'restaurant') redirect(paths.restaurants(), RedirectType.replace);
  redirect(paths.stays(), RedirectType.replace);
};

export default HomePage;
