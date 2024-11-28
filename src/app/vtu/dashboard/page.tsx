import { VtuTransactions } from '@/containers';
import { paths } from '@/utils';
import Link from 'next/link';
import { IoCellular } from 'react-icons/io5';
import { RiWifiFill } from 'react-icons/ri';

const VtuDashboardPage = async () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-4">
        <Link href={paths.vtuPurchaseAirtime()}>
          <div className="bg-[#AED4FF] flex flex-col justify-between rounded-lg p-4 h-56 w-64">
            <div className="grid place-items-center h-12 w-12 rounded-full bg-[#1A85FF]">
              <IoCellular size={24} color="#FFF" />
            </div>
            <p className="text-xl font-semibold">Purchase Airtime</p>
          </div>
        </Link>
        <Link href={paths.vtuPurchaseData()}>
          <div className="bg-[#E1CBFF] flex flex-col justify-between rounded-lg p-4 h-56 w-64">
            <div className="grid place-items-center h-12 w-12 rounded-full bg-[#A259FF]">
              <RiWifiFill size={24} color="#FFF" />
            </div>
            <p className="text-xl font-semibold">Purchase Internet</p>
          </div>
        </Link>
      </div>
      <VtuTransactions />
    </div>
  );
};

export default VtuDashboardPage;
