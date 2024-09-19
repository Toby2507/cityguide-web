'use client';

import { StayCard } from '@/components';
import { getPartnerStays } from '@/server';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const AdminStayList = () => {
  const {
    data: stays,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['stays', 'admin'],
    queryFn: getPartnerStays,
  });

  if (isPending) return null;
  if (isError) return toast.error(error.message);
  return (
    <div className="grid items-center px-2 py-6 gap-10 min-w-0 max-w-full">
      {stays.length ? (
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
