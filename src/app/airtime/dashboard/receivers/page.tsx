import { AirtimeReceivers } from '@/containers';
import { FiPlus } from 'react-icons/fi';

const AirtimeReceiversPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Who are you sending to?</h2>
      <div className="bg-[#E5F0FD] flex flex-col justify-between rounded-lg p-4 h-56 w-64">
        <div className="grid place-items-center h-12 w-12 rounded-full bg-[#CAE2FE]">
          <FiPlus size={24} color="#000" />
        </div>
        <p className="text-lg text-secondary font-semibold">Add new receipient</p>
      </div>
      <AirtimeReceivers />
    </div>
  );
};

export default AirtimeReceiversPage;
