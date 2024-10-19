'use client';

import { useReservationStore } from '@/providers';
import { createReservationSchema } from '@/schemas';
import { createReservation, initiatePayment } from '@/server';
import { IStay, StayType } from '@/types';
import { numberToCurrency, paths } from '@/utils';
import { Button, CircularProgress, Link, Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { PiLockKeyBold } from 'react-icons/pi';
import { SlArrowRight } from 'react-icons/sl';

const UserCompleteReservation = ({ type, name }: IStay) => {
  const { back } = useRouter();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { reservation, clearReservation, setReservation } = useReservationStore();
  const [PaystackPopup, setPaystackPopup] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isReserving, setIsReserving] = useState<boolean>(false);
  const [isPayed, setIsPayed] = useState<boolean>(!!reservation?.payReference);
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
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const completeReservation = async () => {
    setIsReserving(true);
    try {
      if (dayjs(reservation?.checkInDay).isBefore(dayjs()))
        throw new Error('Your checkin date is in the past! Kindly choose a date in the future');
      onOpen();
      await createReservation(reservation!);
      clearReservation();
      toast.success('Your reservation has been created successfully');
    } catch (err: any) {
      onClose();
      toast.error(err.message);
    } finally {
      setIsReserving(false);
    }
  };

  useEffect(() => {
    const loadPaystackPopup = async () => {
      const Paystack = (await import('@paystack/inline-js')).default;
      setPaystackPopup(() => Paystack);
    };

    loadPaystackPopup();
  }, []);
  useEffect(() => {
    setIsPayed(!!reservation?.payReference);
  }, [reservation?.payReference]);
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) =>
            isReserving ? (
              <div className="flex flex-col items-center gap-4 py-10">
                <CircularProgress size="lg" color="primary" className="text-7xl" aria-label="creating reservation..." />
                <p className="text-lg text-accentGray font-medium">Creating your reservation...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 px-4 py-10">
                <IoCheckmarkCircleOutline className="text-7xl" />
                <p className="text-lg text-center font-medium">
                  Your reservation has been successfully <span className="text-primary">Created!</span>
                </p>
                <Link href={paths.stays()}>
                  <Button color="primary" radius="lg">
                    Back to stays
                  </Button>
                </Link>
              </div>
            )
          }
        </ModalContent>
      </Modal>
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
              ensures your payment is handled safely while securely storing your card information for future
              convenience. Here&apos;s how it works
            </p>
            <ul className="list-disc list-inside">
              <li className="text-sm">You&apos;ll only be charged the exact amount for your selected services.</li>
              <li className="text-sm">All charges will be clearly displayed before you confirm.</li>
              <li className="text-sm">
                <span className="font-semibold">Seamless Transactions: </span>Enjoy a smooth, uninterrupted booking
                process
              </li>
              <li className="text-sm">
                <span className="font-semibold">Seamless Cancellations: </span>In case you need to cancel your booking,
                we can process refunds quickly and easily.
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
              We want to make your booking process as smooth as possible while ensuring the highest level of security
              for your transactions. To achieve this, we use a simple card verification process. Here&apos;s how it
              works:
            </p>
            <ul className="list-disc list-inside">
              <li className="text-sm">You&apos;ll be asked to make a small payment of 50 NGN using your card.</li>
              <li className="text-sm">This amount will be immediately refunded to your card.</li>
              <li className="text-sm">
                <span className="font-semibold">Seamless Cancellations: </span>In case you need to cancel your booking,
                we can process refunds quickly and easily.
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
        <div className="flex flex-col gap-2 pt-6 px-4">
          <p className="text-sm">
            Your reservation is directly with {name} and by completing the reservation you agree to the{' '}
            <span className="text-primary underline">reservation conditions</span>,
            <span className="text-primary underline"> general terms </span>
            and <span className="text-primary underline">privacy policy</span>.
          </p>
          <div className="flex items-center justify-end gap-4">
            <Button
              className="self-end mt-2 w-fit"
              color="primary"
              isDisabled={!isPayed}
              isLoading={isReserving}
              onPress={back}
              radius="sm"
              variant="bordered"
              size="lg"
            >
              Check your booking
            </Button>
            <Button
              className="self-end mt-2 w-fit"
              color="primary"
              startContent={<PiLockKeyBold size={22} />}
              isDisabled={!isPayed}
              isLoading={isReserving}
              onPress={completeReservation}
              radius="sm"
              size="lg"
            >
              Complete Reservation
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserCompleteReservation;
