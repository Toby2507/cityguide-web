'use client';

import { VtuAddReceiver, VtuReceivers } from '@/containers';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

const VtuReceiversPage = () => {
  const { refresh } = useRouter();
  const [page, setPage] = useState<string>('main');
  const [activeReceiver, setActiveReceiver] = useState<string>('');

  const onEdit = (id: string) => {
    setActiveReceiver(id);
    setPage('create');
  };
  const goBack = () => {
    setActiveReceiver('');
    setPage('main');
    refresh();
  };

  return (
    <>
      {page === 'main' ? (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Who are you sending to?</h2>
          <div
            className="bg-[#E5F0FD] flex flex-col justify-between rounded-lg p-4 h-56 w-64"
            onClick={() => setPage('create')}
          >
            <div className="grid place-items-center h-12 w-12 rounded-full bg-[#CAE2FE]">
              <FiPlus size={24} color="#000" />
            </div>
            <p className="text-lg text-secondary font-semibold">Add new receipient</p>
          </div>
          <VtuReceivers handleEdit={onEdit} />
        </div>
      ) : null}
      {page === 'create' ? <VtuAddReceiver activeId={activeReceiver} goBack={goBack} /> : null}
    </>
  );
};

export default VtuReceiversPage;
