'use client';

import { useReservationStore } from '@/providers';
import { createReservationSchema } from '@/schemas';
import { initiatePayment } from '@/server';
import { IStay, StayType } from '@/types';
import { numberToCurrency } from '@/utils';
import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { SlArrowRight } from 'react-icons/sl';

const UserCompleteReservation = ({ type }: IStay) => {
  const [PaystackPopup, setPaystackPopup] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPayed, setIsPayed] = useState<boolean>(false);
  const { reservation, setReservation } = useReservationStore();
  const fullPayment = [StayType.APARTMENT, StayType.BnB].includes(type);

  const makePayment = async () => {
    setIsLoading(true);
    try {
      const data = createReservationSchema.safeParse(reservation);
      if (!data.success) throw new Error(data.error.flatten().formErrors.join(', '));
      const { access_code, reference, authorization_url } = await initiatePayment(
        fullPayment ? reservation?.price! : 50
      );
      setReservation({ payReference: reference });
      const popup = new PaystackPopup();
      popup.resumeTransaction(access_code);
      setIsPayed(true);
      console.log({ access_code, reference, authorization_url });
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadPaystackPopup = async () => {
      const Paystack = (await import('@paystack/inline-js')).default;
      setPaystackPopup(() => Paystack);
    };

    loadPaystackPopup();
  }, []);
  return (
    <section className="flex flex-col gap-2">
      <article className="flex flex-col gap-1 border-2 rounded-xl px-6 py-4">
        <h3 className="text-lg font-bold tracking-wide">You&apos;ll pay at the property</h3>
        <p>Your card won&apos;t be charged - we only need your card to guarantee your booking.</p>
      </article>
      {fullPayment ? (
        <article className="flex flex-col gap-1 border-2 rounded-xl px-6 py-4">
          <h3 className="text-lg font-bold tracking-wide">Secure Your Booking and Complete Your Payment</h3>
          <p>
            We&apos;re committed to providing you with a smooth, secure booking experience. Our streamlined process
            ensures your payment is handled safely while securely storing your card information for future convenience.
            Here&apos;s how it works
          </p>
          <ul className="list-disc list-inside">
            <li className="text-sm">You&apos;ll only be charged the exact amount for your selected services.</li>
            <li className="text-sm">All charges will be clearly displayed before you confirm.</li>
            <li className="text-sm">
              <span className="font-semibold">Seamless Transactions: </span>Enjoy a smooth, uninterrupted booking
              process
            </li>
            <li className="text-sm">
              <span className="font-semibold">Seamless Cancellations: </span>In case you need to cancel your booking, we
              can process refunds quickly and easily.
            </li>
            <li className="text-sm">Your card information is encrypted and stored securely.</li>
            <li className="text-sm">We comply with all relevant data protection regulations.</li>
          </ul>
          <Button
            className="self-end mt-2 w-fit"
            color="primary"
            endContent={<SlArrowRight />}
            isDisabled={isPayed}
            isLoading={isLoading}
            onPress={makePayment}
            radius="sm"
            size="lg"
          >
            Make Payment: {numberToCurrency(reservation?.price!)}
          </Button>
        </article>
      ) : (
        <article className="flex flex-col gap-1 border-2 rounded-xl px-6 py-4">
          <h3 className="text-lg font-bold tracking-wide">Secure Your Booking with Quick Card Verification</h3>
          <p>
            We want to make your booking process as smooth as possible while ensuring the highest level of security for
            your transactions. To achieve this, we use a simple card verification process. Here&apos;s how it works:
          </p>
          <ul className="list-disc list-inside">
            <li className="text-sm">You&apos;ll be asked to make a small payment of 50 NGN using your card.</li>
            <li className="text-sm">This amount will be immediately refunded to your card.</li>
            <li className="text-sm">
              <span className="font-semibold">Seamless Cancellations: </span>In case you need to cancel your booking, we
              can process refunds quickly and easily.
            </li>
            <li className="text-sm">Your card information is encrypted and stored securely.</li>
            <li className="text-sm">We comply with all relevant data protection regulations.</li>
          </ul>
          <Button
            className="self-end mt-2 w-fit"
            color="primary"
            endContent={<SlArrowRight />}
            isDisabled={isPayed}
            isLoading={isLoading}
            onPress={makePayment}
            radius="sm"
            size="lg"
          >
            Verify card
          </Button>
        </article>
      )}
    </section>
  );
};

export default UserCompleteReservation;
