'use client';

import { PaymentBox } from '@/components';
import { vtuPurchaseSchema, VtuPurchaseType } from '@/schemas';
import { createTransaction } from '@/server';
import { VTUType } from '@/types';
import { numberToCurrency, paths } from '@/utils';
import { Button } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { PiLockKeyBold } from 'react-icons/pi';

interface Props {
  type: VTUType;
  goBack: () => void;
}

const VtuPurchasePayment = ({ type, goBack }: Props) => {
  const { push } = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleSubmit, setValue, watch } = useFormContext<VtuPurchaseType>();

  const purchaseObj = watch();
  const paymentState = useMemo(
    () => ({
      useSavedCard: !!purchaseObj.useSavedCard,
      saveCard: !!purchaseObj.saveCard,
    }),
    [purchaseObj.useSavedCard, purchaseObj.saveCard]
  );
  const paymentComplete = useMemo(() => !!purchaseObj.payReference, [purchaseObj.payReference]);

  const paymentValidator = () => {
    const data = vtuPurchaseSchema.safeParse(watch());
    if (!data.success) {
      const error = data.error.flatten();
      throw new Error(error.formErrors.join(', ') || Object.values(error.fieldErrors ?? {}).join(', '));
    }
  };
  const updateState = (data: Record<string, any>) => {
    if ('useSavedCard' in data) setValue('useSavedCard', data['useSavedCard']);
    if ('payReference' in data) setValue('payReference', data['payReference']);
    if ('saveCard' in data) setValue('saveCard', data['saveCard']);
  };
  const onSubmit: SubmitHandler<VtuPurchaseType> = async (data) => {
    setIsLoading(true);
    try {
      if (!purchaseObj.payReference) throw new Error('Payment not completed');
      await createTransaction(data);
      queryClient.invalidateQueries({ queryKey: ['vtu-transactions'] });
      push(paths.vtuHistory());
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
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
        <h1 className="text-xl font-semibold">Complete Purchase</h1>
      </div>
      <div className="container mx-auto max-w-3xl flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold">Receipient: </h3>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border shadow-xl px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold">First Name:</h4>
                <p className="text-sm">{watch('firstName')}</p>
              </div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold">Last Name:</h4>
                <p className="text-sm">{watch('lastName')}</p>
              </div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold">Phone Number:</h4>
                <p className="text-sm">{watch('phoneNumber')}</p>
              </div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold">ISP:</h4>
                <p className="text-sm">{watch('network')}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold">Purchase Info: </h3>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border shadow-xl px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold">Amount:</h4>
                <p className="text-sm">{numberToCurrency(watch('amount'))}</p>
              </div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold">Value:</h4>
                <p className="text-sm">{watch('value')}</p>
              </div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold">Purchase Type:</h4>
                <p className="text-sm">{watch('type')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-2 rounded-xl pl-6 p-4">
          <PaymentBox
            amount={watch('amount')}
            currency="NGN"
            disabled={paymentComplete}
            state={paymentState}
            updateState={updateState}
            validator={paymentValidator}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <Button
            className="self-end mt-2 w-fit"
            color="primary"
            onPress={goBack}
            radius="sm"
            variant="bordered"
            size="lg"
          >
            Select Another Product
          </Button>
          <Button
            className="self-end mt-2 w-fit"
            color="primary"
            startContent={<PiLockKeyBold size={22} />}
            isDisabled={!paymentComplete}
            isLoading={isLoading}
            onPress={() => handleSubmit(onSubmit)()}
            radius="sm"
            size="lg"
          >
            Complete Purchase
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VtuPurchasePayment;
