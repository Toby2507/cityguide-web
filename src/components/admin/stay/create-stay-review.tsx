'use client';

import { DetailPageAmenities, DetailPageOverview, StayDetailAvailability, StayDetailRules } from '@/containers';
import { usePropertyStore } from '@/providers';
import { CreateStayInput } from '@/schemas';
import { createStay } from '@/server';
import { EntityType, IStay, MaxDays, PropertyType } from '@/types';
import { paths } from '@/utils';
import { Button, CircularProgress, Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

interface IProps {
  setStep: (newStep: number) => void;
}

const CreateStayReview = ({ setStep }: IProps) => {
  const { push } = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { setStay } = usePropertyStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { watch, handleSubmit } = useFormContext<CreateStayInput>();
  const stay: IStay = {
    ...watch(),
    _id: 'stay id 1',
    partner: 'partner id',
    createdAt: '2024-06-04T08:50:15.956Z',
    updatedAt: '2024-06-04T08:50:15.956Z',
    partnerType: EntityType.ESTABLISHMENT,
    rating: 4.9,
    reviewCount: 500,
    optionalServices: watch('optionalServices') ?? [],
    cancellationPolicy: null,
    categoryRatings: {},
    maxDays: watch('maxDays') ?? MaxDays.DEFAULT,
  };

  const onSubmit: SubmitHandler<CreateStayInput> = async (data) => {
    setIsLoading(true);
    onOpen();
    await createStay(data);
    setIsLoading(false);
    setStay(null);
    setTimeout(() => push(paths.adminStays()), 2000);
  };
  return (
    <div className="flex flex-col justify-center gap-4 pt-4">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {isLoading ? (
            <div className="flex flex-col items-center gap-4 py-10">
              <CircularProgress size="lg" color="primary" className="text-7xl" aria-label="Publishing property..." />
              <p className="text-lg text-accentGray font-medium">Publishing Property...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 px-4 py-10">
              <IoCheckmarkCircleOutline className="text-7xl" />
              <p className="text-lg font-medium">
                Property Successfully <span className="text-primary">Published!</span>
              </p>
              <Link href={paths.adminStays()}>
                <Button className="text-sm px-14 font-semibold w-fit" color="primary" radius="full" variant="flat">
                  Dashboard
                </Button>
              </Link>
            </div>
          )}
        </ModalContent>
      </Modal>
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-center font-semibold">Preview and Publish</h1>
        <p className="text-center font-light">
          Experience your property through their eyes. Get a sneak peek at how your property will be showcased to the
          users.
        </p>
      </div>
      <div className="flex flex-col gap-4 max-w-7xl py-2 mx-auto w-full">
        <DetailPageOverview propType={PropertyType.STAY} {...stay} />
        <DetailPageAmenities {...stay} />
        <StayDetailAvailability stay={stay} />
        <StayDetailRules stay={stay} />
      </div>
      <div className="flex flex-col gap-2 mx-auto w-1/2">
        <Button
          className="text-sm font-semibold"
          color="primary"
          radius="full"
          variant="solid"
          onPress={() => handleSubmit(onSubmit)()}
        >
          Publish
        </Button>
        <Button
          className="text-sm font-semibold px-14"
          color="primary"
          radius="full"
          variant="flat"
          onPress={() => setStep(8)}
        >
          No I need to make a change
        </Button>
      </div>
    </div>
  );
};

export default CreateStayReview;
