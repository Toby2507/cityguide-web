'use client';

import { airtimeDataAmounts, airtimeVTUAmounts } from '@/data';
import { AirtimePurchaseType } from '@/schemas';
import { AirtimePurchaseTypes } from '@/types';
import { paths } from '@/utils';
import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoIosArrowRoundBack } from 'react-icons/io';

interface Props {
  type: AirtimePurchaseTypes;
  goBack: () => void;
}

const AirtimePurchaseAmount = ({ type, goBack }: Props) => {
  const { push } = useRouter();
  const { handleSubmit, setValue, watch } = useFormContext<AirtimePurchaseType>();
  const amounts = type === AirtimePurchaseTypes.VTU ? airtimeVTUAmounts : airtimeDataAmounts;

  const onSubmit: SubmitHandler<AirtimePurchaseType> = async (data) => {
    toast.success('Airtime purchase is being processed');
    push(paths.airtimeDashboard());
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-6">
        <Button
          startContent={<IoIosArrowRoundBack />}
          size="sm"
          variant="light"
          color="primary"
          className="w-fit pl-4 pr-6"
          onClick={goBack}
        >
          Back
        </Button>
        <h1 className="text-xl font-semibold">Top up amount</h1>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {amounts.map(({ value, data }) => (
          <button
            onClick={() => setValue('amount', value)}
            className="flex flex-col bg-gray150 p-3 rounded-xl"
            key={data}
          >
            <div className="flex items-center justify-between gap-4 w-full">
              <p className="text-sm font-medium">{value} NGN</p>
              <p className="text-sm font-medium">{data}</p>
            </div>
            <p className="text-xs text-accentGray font-medium">You pay: {value * 0.06} EUR</p>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Input
          name="amount"
          label="Amount"
          placeholder=" "
          isRequired
          radius="sm"
          value={watch('amount')?.toString()}
          onChange={(e) => setValue('amount', +e.target.value)}
          className="text-accentGray col-span-3"
        />
        <Button
          onPress={() => handleSubmit(onSubmit)()}
          className="bg-gradient-linear text-white text-base font-semibold px-20 py-6 mt-2 w-full"
          radius="full"
        >
          Top up
        </Button>
      </div>
    </div>
  );
};

export default AirtimePurchaseAmount;
