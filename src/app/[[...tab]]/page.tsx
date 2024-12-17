import { paths } from '@/utils';
import { redirect, RedirectType } from 'next/navigation';

interface Props {
  params: {
    tab?: string[];
  };
}

const HomePage = ({ params: { tab } }: Props) => {
  if (tab && tab[0] === 'restaurant') redirect(paths.restaurants(), RedirectType.replace);
  if (tab && tab[0] === 'nightlife') redirect(paths.nightlifes(), RedirectType.replace);
  if (tab && tab[0] === 'vtu') redirect(paths.vtu(), RedirectType.replace);
  redirect(paths.stays(), RedirectType.replace);
};

export default HomePage;
