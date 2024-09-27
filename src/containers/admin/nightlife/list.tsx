'use client';

import { NightlifeCard } from '@/components';
import { getPartnerNightlifes } from '@/server';
import { useQuery } from '@tanstack/react-query';

const AdminNightlifeList = () => {
  const { data: nightlifes, isPending } = useQuery({
    queryKey: ['nightlifes', 'admin'],
    queryFn: getPartnerNightlifes,
  });

  if (!nightlifes?.length || isPending) return null;
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
