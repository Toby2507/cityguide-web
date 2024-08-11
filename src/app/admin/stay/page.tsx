import { StayCard } from '@/components';
import { getPartnerStays } from '@/server';
import { paths } from '@/utils';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';

const AdminStayListPage = async () => {
  const stays = await getPartnerStays();
  return (
    <section className="flex flex-col gap-2" id="properties">
      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-20">
          <h2 className="text-xl font-semibold">Stay Properties</h2>
          <Link href={paths.createStay()}>
            <Button className="text-primary text-sm font-semibold" color="secondary" radius="full" size="sm">
              <FiPlus />
              Add New
            </Button>
          </Link>
        </div>
        <div className="grid items-center px-2 py-6 gap-10 min-w-0 max-w-full">
          {stays.map((stay) => (
            <StayCard key={stay._id} {...stay} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminStayListPage;
