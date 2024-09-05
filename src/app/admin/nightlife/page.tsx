import { NightlifeCard } from '@/components';
import { getPartnerNightlifes, getUser } from '@/server';
import { EntityType } from '@/types';
import { paths } from '@/utils';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { redirect, RedirectType } from 'next/navigation';
import { FiPlus } from 'react-icons/fi';

const AdminNightlifeListPage = async () => {
  const user = await getUser();
  if (user?.type !== EntityType.ESTABLISHMENT) redirect(paths.admin(), RedirectType.replace);
  const nightlifes = await getPartnerNightlifes();
  return (
    <section className="flex flex-col gap-2">
      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-20">
          <h2 className="text-xl font-semibold">Nightlife Properties</h2>
          <Link href={paths.createNightlife()}>
            <Button className="text-primary text-sm font-semibold" color="secondary" radius="full" size="sm">
              <FiPlus />
              Add New
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid items-center px-2 py-6 gap-10 min-w-0 max-w-full">
        {nightlifes?.length ? (
          nightlifes.map((nightlife) => <NightlifeCard key={nightlife._id} {...nightlife} />)
        ) : (
          <div className="grid place-items-center h-[70vh]">
            <p className="text-2xl text-accentGray text-center font-medium">No nightlife available</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminNightlifeListPage;
