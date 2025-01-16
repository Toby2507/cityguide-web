import { usePriceConversion } from '@/hooks';
import { IVtuTransaction } from '@/types';
import { numberToCurrency } from '@/utils';

const TransactionDetail = ({
  _id,
  amount,
  firstName,
  lastName,
  network,
  phoneNumber,
  type,
  value,
}: IVtuTransaction) => {
  const { convertPrice } = usePriceConversion();
  return (
    <div className="flex flex-col w-full">
      {/* Transaction INFO */}
      <div className="flex items-center justify-between gap-10">
        <p className="text-sm">Transaction ID</p>
        <p className="text-sm font-semibold uppercase">{_id}</p>
      </div>
      <div className="bg-slate-300 h-px my-4" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-10">
          <p className="text-sm">Transaction amount</p>
          <p className="text-sm font-semibold">{convertPrice(amount, 'NGN')}</p>
        </div>
        <div className="flex items-center justify-between gap-10">
          <p className="text-sm">Transaction fees</p>
          <p className="text-sm font-semibold">{convertPrice(0, 'NGN')}</p>
        </div>
        <div className="flex items-center justify-between gap-10">
          <p className="text-sm">Total to recipient</p>
          <p className="text-sm font-semibold">{numberToCurrency(amount)}</p>
        </div>
        <p className="text-xs text-slate-400">
          Your recipient may get less due to fees charged by the service provider, by a bank, and/or by foreign taxes.
        </p>
        <div className="flex items-center justify-between gap-10">
          <p className="text-sm">Total amount</p>
          <p className="text-sm font-semibold uppercase">{convertPrice(amount, 'NGN')}</p>
        </div>
        <div className="flex items-center justify-between gap-10">
          <p className="text-sm">Top up value</p>
          <p className="text-sm font-semibold">{`${type} - ${value}`}</p>
        </div>
        {/* Reciever Info */}
        <div className="bg-slate-300 h-px my-4" />
        <div className="flex items-center justify-between gap-10">
          <p className="text-sm">Receive method</p>
          <p className="text-sm font-semibold">Mobile Top up</p>
        </div>
        <div className="bg-slate-300 h-px my-4" />
        <div className="flex items-center justify-between gap-10">
          <p className="text-sm">Receiver&apos;s name</p>
          <p className="text-sm font-semibold capitalize">{`${firstName} ${lastName}`}</p>
        </div>
        <div className="flex items-center justify-between gap-10">
          <p className="text-sm">Mobile number</p>
          <p className="text-sm font-semibold">{phoneNumber}</p>
        </div>
        <div className="flex items-center justify-between gap-10">
          <p className="text-sm">Service Provider</p>
          <p className="text-sm font-semibold">{network}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
