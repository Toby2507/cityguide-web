'use client';

import { NightlifeCard } from '@/components';
import { getPartnerNightlifes } from '@/server';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const AdminNightlifeList = () => {
  const {
    data: nightlifes,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['nightlifes', 'admin'],
    queryFn: getPartnerNightlifes,
  });

  if (isPending) return null;
  if (isError) return toast.error(error.message);
  return (
    <div className="grid items-center px-2 py-6 gap-10 min-w-0 max-w-full">
      {nightlifes?.length ? (
        nightlifes.map((nightlife) => <NightlifeCard key={nightlife._id} {...nightlife} />)
      ) : (
        <div className="grid place-items-center h-[70vh]">
          <p className="text-2xl text-accentGray text-center font-medium">No nightlife available</p>
        </div>
      )}
    </div>
  );
};

export default AdminNightlifeList;
