import { AirtimeTransactionStatus, IAirtimeTransaction } from '@/types';
import { numberToCurrency } from '@/utils';
import { Button } from '@nextui-org/react';
import { GoArrowDownRight, GoArrowUpRight } from 'react-icons/go';

interface Props {
  columnKey: string;
  transaction: IAirtimeTransaction;
}

const TransactionCell = ({ columnKey, transaction }: Props) => {
  let statusColor: 'secondary' | 'default' | 'warning' | 'danger' | 'primary' | 'success' | undefined = 'secondary';
  if (transaction.status === AirtimeTransactionStatus.PENDING) statusColor = 'warning';
  if (transaction.status === AirtimeTransactionStatus.FAILED) statusColor = 'danger';
  if (columnKey === 'status')
    return (
      <div className="flex items-center gap-1">
        <div className={`w-1 h-1 rounded-full bg-${statusColor}`} />
        <p className={`text-base font-medium text-right text-${statusColor}`}>{transaction.status}</p>
      </div>
    );
  if (columnKey === 'amount') return <p className="text-xl font-semibold">{numberToCurrency(transaction.amount)}</p>;
  if (columnKey === 'user')
    return (
      <div className="flex items-center gap-2">
        <Button isIconOnly aria-label="User" isDisabled size="lg" color={statusColor} variant="flat">
          {transaction.status === AirtimeTransactionStatus.FAILED ? (
            <GoArrowDownRight size={20} />
          ) : (
            <GoArrowUpRight size={20} />
          )}
        </Button>
        <div className="flex flex-col justify-center">
          <p className="text-xs text-accentGray font-medium">Sent to</p>
          <p className="text-xl font-semibold">
            {transaction.firstName} {transaction.lastName}
          </p>
        </div>
      </div>
    );
  return <div>TransactionCell</div>;
};

export default TransactionCell;
