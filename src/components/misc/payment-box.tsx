'use client';

import { usePriceConversion } from '@/hooks';
import { useAuth } from '@/providers';
import { completePayment, initiatePayment } from '@/server';
import { Button, Checkbox, Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { SlArrowRight } from 'react-icons/sl';
import CompletePayment from './complete-payment';

interface Props {
  amount?: number;
  currency?: string;
  disabled?: boolean;
  state: {
    useSavedCard: boolean;
    saveCard: boolean;
  };
  updateState: (data: Record<string, any>) => void;
  validator?: () => void;
}

const PaymentBox = ({ amount, currency, disabled, state, updateState, validator }: Props) => {
  const { user } = useAuth();
  const { convertPrice } = usePriceConversion();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [PaystackPopup, setPaystackPopup] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reference, setReference] = useState<string>('');
  const [completeType, setCompleteType] = useState<string>('');

  const makePayment = async () => {
    setIsLoading(true);
    try {
      !!validator && validator();
      const { access_code, authorization_url, status, reference, convertedAmount, amountPayed, message } =
        await initiatePayment(amount, currency, state.useSavedCard);
      setReference(reference);
      updateState({ payReference: reference, convertedPriceNGN: convertedAmount || amountPayed });
      const completionRequired = status.startsWith('send_');
      if (status === 'initiated') {
        const popup = new PaystackPopup();
        popup.resumeTransaction(access_code);
      } else if (status === 'open_url') {
        window.open(authorization_url, '_blank');
      } else if (completionRequired) {
        setCompleteType(status);
        onOpen();
      } else if (status === 'success' || status === 'pending') {
        toast.success(message);
      } else throw new Error(message);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleComplete = useCallback(async (data: Record<string, any>) => {
    await completePayment(data);
  }, []);

  useEffect(() => {
    const loadPaystackPopup = async () => {
      const Paystack = (await import('@paystack/inline-js')).default;
      setPaystackPopup(() => Paystack);
    };
    loadPaystackPopup();
  }, []);
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => <CompletePayment reference={reference} type={completeType} onClose={handleComplete} />}
        </ModalContent>
      </Modal>
      <div className="flex flex-col gap-4">
        {user?.cardDetails ? (
          <div className="flex flex-col gap-3 pb-2">
            <h3 className="font-semibold">Do you want to continue with your saved card? </h3>
            <div className="flex items-end justify-between gap-10">
              <Checkbox
                className="border shadow-xl px-4 py-2 rounded-lg"
                isSelected={state.useSavedCard}
                onValueChange={(val: boolean) => updateState({ useSavedCard: val })}
              >
                <ul className="flex flex-col pl-2">
                  <li className="text-sm capitalize">
                    <span className="font-medium">Card type: </span>
                    {user.cardDetails.brand}
                  </li>
                  <li className="text-sm capitalize">
                    <span className="font-medium">Card number: </span>
                    **** **** **** {user.cardDetails.last4}
                  </li>
                  <li className="text-sm capitalize">
                    <span className="font-medium">Expiry date: </span>
                    {user.cardDetails.exp_month}/{user.cardDetails.exp_year}
                  </li>
                  <li className="text-sm capitalize">
                    <span className="font-medium">Bank name: </span>
                    {user.cardDetails.bank}
                  </li>
                </ul>
              </Checkbox>
              {state.useSavedCard ? (
                <Button
                  className="self-end mt-2 w-fit"
                  color="primary"
                  endContent={<SlArrowRight />}
                  isDisabled={disabled}
                  isLoading={isLoading}
                  onPress={makePayment}
                  radius="sm"
                  size="lg"
                >
                  {amount && currency ? `Make Payment: ${convertPrice(amount, currency)}` : 'Verify card'}
                </Button>
              ) : null}
            </div>
          </div>
        ) : null}
        {!state.useSavedCard ? (
          <div className="flex flex-col gap-1">
            {user?.cardDetails ? <h3 className="font-semibold">Or make payment using a different card? </h3> : null}
            <div className="flex items-center justify-between gap-10">
              <Checkbox isSelected={state.saveCard} onValueChange={(val: boolean) => updateState({ saveCard: val })}>
                Save Card
              </Checkbox>
              <Button
                className="self-end mt-2 w-fit"
                color="primary"
                endContent={<SlArrowRight />}
                isDisabled={disabled}
                isLoading={isLoading}
                onPress={makePayment}
                radius="sm"
                size="lg"
              >
                {amount && currency ? `Make Payment: ${convertPrice(amount, currency)}` : 'Verify card'}
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default PaymentBox;
