'use client';

import { StayCard } from '@/components';
import { getPartnerStays } from '@/server';
import { useQuery } from '@tanstack/react-query';

const AdminStayList = () => {
  const { data: stays, isPending } = useQuery({
    queryKey: ['stays', 'admin'],
    queryFn: getPartnerStays,
  });

  if (!stays?.length || isPending) return null;
  return (
    <div className="grid items-center px-2 py-6 gap-10 min-w-0 max-w-full">
      {stays?.length ? (
        stays?.map((stay) => <StayCard key={stay._id} {...stay} />)
      ) : (
        <div className="grid place-items-center h-[70vh]">
          <p className="text-2xl text-accentGray text-center font-medium">No stays available</p>
        </div>
      )}
    </div>
  );
};

export default AdminStayList;
