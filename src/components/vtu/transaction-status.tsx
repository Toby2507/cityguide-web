import { IVtuTransaction, VTUTransactionStatus } from '@/types';
import { numberToCurrency } from '@/utils';
import dayjs from 'dayjs';

interface IProgress {
  curr: boolean;
  next: boolean;
}

const ProgressLine = ({ curr, next }: IProgress) => (
  <>
    <div
      className={`absolute border-l-2 ${curr ? 'border-green400' : 'border-gray-300'} ${
        next ? '' : 'border-dashed'
      } top-2 left-[5px] bottom-1/3`}
    />
    <div
      className={`absolute border-l-2 ${
        next ? 'border-green400' : 'border-gray-300 border-dashed'
      } top-2/3 left-[5px] -bottom-2`}
    />
  </>
);
const ProgressDot = ({ curr, next }: IProgress) => (
  <div className={`grid place-items-center h-3 w-3 rounded-full ${curr ? 'bg-green400' : 'bg-gray-300'} mt-1`}>
    {!next ? <div className="bg-white h-[6px] w-[6px] rounded-full z-10" /> : null}
  </div>
);

const TransactionStatus = ({ amount, firstName, statusProgress, type }: IVtuTransaction) => {
  statusProgress = {
    [VTUTransactionStatus.CREATED]: new Date(Date.now() - 1000 * 60 * 60),
    [VTUTransactionStatus.PROCESSING]: new Date(Date.now() - 1000 * 60 * 57),
    [VTUTransactionStatus.LOCAL_PROCESSING]: null,
    [VTUTransactionStatus.SUCCESSFUL]: null,
    [VTUTransactionStatus.FAILED]: null,
  };
  return (
    <div className="flex flex-col">
      <div className="relative flex gap-4 pb-4">
        <ProgressLine curr={!!statusProgress.Created} next={!!statusProgress.Processing} />
        <ProgressDot curr={!!statusProgress.Created} next={!!statusProgress.Processing} />
        <div className="flex flex-col">
          <p className="text-sm font-bold">Transaction created</p>
          {statusProgress.Created ? (
            <p className="text-xs text-gray-400">{dayjs(statusProgress.Created).format('MMM DD, hh:mm A')}</p>
          ) : null}
        </div>
      </div>
      <div className="relative flex gap-4 pb-4">
        <ProgressLine curr={!!statusProgress.Processing} next={!!statusProgress['Local Processing']} />
        <ProgressDot curr={!!statusProgress.Processing} next={!!statusProgress['Local Processing']} />
        <div className="flex flex-col">
          <p className="text-sm font-bold">We are processing the transaction</p>
          {statusProgress.Processing ? (
            <p className="text-xs text-gray-400">{dayjs(statusProgress.Processing).format('MMM DD, hh:mm A')}</p>
          ) : null}
        </div>
      </div>
      <div className="relative flex gap-4 pb-4">
        <ProgressLine curr={!!statusProgress['Local Processing']} next={!!statusProgress.Successful} />
        <ProgressDot curr={!!statusProgress['Local Processing']} next={!!statusProgress.Successful} />
        <div className="flex flex-col">
          <p className="text-sm font-bold">Service provider is processing the purchase</p>
          {statusProgress['Local Processing'] ? (
            <p className="text-xs text-gray-400">
              {dayjs(statusProgress['Local Processing']).format('MMM DD, hh:mm A')}
            </p>
          ) : null}
        </div>
      </div>
      {!statusProgress.Failed ? (
        <div className="relative flex gap-4 pb-4">
          <ProgressDot curr={!!statusProgress.Successful} next={!!statusProgress.Successful} />
          <div className="flex flex-col">
            <p className="text-sm font-bold">{`${type} - ${numberToCurrency(amount)} paid out to ${firstName}`}</p>
            {statusProgress.Successful ? (
              <p className="text-xs text-gray-400">{dayjs(statusProgress.Processing).format('MMM DD, hh:mm A')}</p>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="relative flex gap-4 pb-4">
          <ProgressDot curr={!!statusProgress.Failed} next={true} />
          <div className="flex flex-col">
            <p className="text-sm font-bold">{`${type} - ${numberToCurrency(amount)} paid out to ${firstName}`}</p>
            {statusProgress.Failed ? (
              <p className="text-xs text-gray-400">{dayjs(statusProgress.Processing).format('MMM DD, hh:mm A')}</p>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionStatus;
