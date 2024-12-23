'use client';

import { getVtuTransaction } from '@/server';
import { VTUStatus } from '@/types';
import { numberToCurrency } from '@/utils';
import { Tab, Tabs } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { MdOutlineSendToMobile, MdOutlineSmsFailed } from 'react-icons/md';
import TransactionDetail from './transaction-detail';
import TransactionStatus from './transaction-status';

interface Props {
  id: string;
  initial: 'status' | 'details';
  onClose: () => void;
}

const TransactionInfo = ({ id, initial, onClose }: Props) => {
  const [activeTab, setActiveTab] = useState<string>(initial);
  const { data: transaction, isPending } = useQuery({
    queryKey: ['vtu-transactions', id],
    queryFn: async () => await getVtuTransaction(id),
  });
  if (!transaction || isPending) return null;
  let headText = 'Sending';
  let HeadIcon = MdOutlineSendToMobile;
  if (transaction.status === VTUStatus.SUCCESSFUL) {
    headText = 'Sent';
    HeadIcon = FiCheckCircle;
  }
  if (transaction.status === VTUStatus.FAILED) {
    headText = 'Failed';
    HeadIcon = MdOutlineSmsFailed;
  }
  return (
    <div className="flex flex-col h-[80vh]">
      <div className="flex flex-col items-center gap-4 bg-brandBlue px-4 py-10">
        <div className="bg-white p-4 rounded-lg">
          <HeadIcon className="text-brandBlue text-lg" />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-base text-white">
            {headText}{' '}
            <span className="text-lg text-white font-semibold">
              {transaction.type} - {numberToCurrency(transaction.amount)}
            </span>
          </p>
          <p className="text-base text-white -mt-1">
            to{' '}
            <span className="text-lg text-white font-semibold">
              {transaction.firstName} {transaction.lastName}
            </span>
          </p>
        </div>
        <div className="bg-white px-2 py-1 rounded-sm">
          <p className="text-brandBlue text-xs font-bold capitalize">{transaction.status}</p>
        </div>
      </div>
      <div className="bg-white h-full">
        <div className="flex flex-col items-center bg-white p-4 shadow-lg rounded-xl mx-auto -mt-6 max-h-[55vh] w-11/12 overflow-y-auto">
          <Tabs
            aria-label="transaction info"
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(String(key))}
          >
            <Tab key="status" title="Status" className="self-stretch">
              <TransactionStatus {...transaction} />
            </Tab>
            <Tab key="details" title="Details">
              <TransactionDetail {...transaction} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfo;
