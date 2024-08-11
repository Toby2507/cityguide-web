import { StayCard } from '@/components';
import { stays } from '@/data';
import { paths } from '@/utils';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';

const AdminProperties = () => {
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
        <div className="overflow-x-auto p-2 grid grid-cols-5 gap-4 min-w-0 max-w-full">
          {stays.map((stay) => (
            <StayCard key={stay._id} {...stay} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminProperties;
