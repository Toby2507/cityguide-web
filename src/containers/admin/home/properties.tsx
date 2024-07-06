import { StayCard } from '@/components';
import { stays } from '@/data';
import { Button } from '@nextui-org/react';
import { FiPlus } from 'react-icons/fi';

const AdminProperties = () => {
  return (
    <section className="flex flex-col gap-2" id="properties">
      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-20">
          <h2 className="text-xl font-semibold">Stay Properties</h2>
          <Button className="text-primary text-sm font-semibold" color="secondary" radius="full" size="sm">
            <FiPlus />
            Add New
          </Button>
        </div>
        <div className="overflow-x-auto p-2 flex gap-4 min-w-0 max-w-full">
          {stays.map((stay) => (
            <StayCard key={stay._id} {...stay} />
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-20">
          <h2 className="text-xl font-semibold">Restaurant Properties</h2>
          <Button className="text-primary text-sm font-semibold" color="secondary" radius="full" size="sm">
            <FiPlus />
            Add New
          </Button>
        </div>
        <div className="overflow-x-auto p-2 flex gap-4 min-w-0 max-w-full">
          {stays.map((stay) => (
            <StayCard key={stay._id} {...stay} />
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-20">
          <h2 className="text-xl font-semibold">Night Life Properties</h2>
          <Button className="text-primary text-sm font-semibold" color="secondary" radius="full" size="sm">
            <FiPlus />
            Add New
          </Button>
        </div>
        <div className="overflow-x-auto p-2 flex gap-4 min-w-0 max-w-full">
          {stays.map((stay) => (
            <StayCard key={stay._id} {...stay} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminProperties;
