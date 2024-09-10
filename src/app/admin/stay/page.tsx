import { ErrorDisplay, StayCard } from '@/components';
import { getPartnerStays } from '@/server';
import { paths } from '@/utils';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';

const AdminStayListPage = async () => {
  try {
    const stays = await getPartnerStays();
    return (
      <section className="flex flex-col gap-2">
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
            {stays.length ? (
              stays?.map((stay) => <StayCard key={stay._id} {...stay} />)
            ) : (
              <div className="grid place-items-center h-[70vh]">
                <p className="text-2xl text-accentGray text-center font-medium">No stays available</p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  } catch (err: any) {
    return <ErrorDisplay error={err.message} />;
  }
};

export default AdminStayListPage;
