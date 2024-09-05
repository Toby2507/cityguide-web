import { getPartnerNightlifes, getUser } from '@/server';
import { EntityType } from '@/types';
import { paths } from '@/utils';
import { redirect, RedirectType } from 'next/navigation';

const AdminNightlifeListPage = async () => {
  const user = await getUser();
  if (user?.type !== EntityType.ESTABLISHMENT) redirect(paths.admin(), RedirectType.replace);
  const nightlifes = await getPartnerNightlifes();
  console.log(nightlifes);
  return <div>AdminNightlifeListPage</div>;
};

export default AdminNightlifeListPage;
