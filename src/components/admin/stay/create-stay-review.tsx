'use client';

import { ICreateStay, IStay } from '@/types';
import { Dispatch, SetStateAction, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import CreateStayButtons from './create-stay-btns';
import { StayDetailAmenities, StayDetailAvailability, StayDetailOverview, StayDetailRules } from '@/containers';
import { Button, CircularProgress, Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import { createStay } from '@/server';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

interface IProps {
  setStep: Dispatch<SetStateAction<number>>;
}

const CreateStayReview = ({ setStep }: IProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { watch, handleSubmit } = useFormContext<ICreateStay>();
  const stay: IStay = {
    ...watch(),
    _id: 'stay id 1',
    partner: 'partner id',
    createdAt: '2024-06-04T08:50:15.956Z',
    updatedAt: '2024-06-04T08:50:15.956Z',
    partnerType: 'ESTABLISHMENT',
    rating: 4.9,
  };

  const onSubmit: SubmitHandler<ICreateStay> = async (data) => {
    setIsLoading(true);
    onOpen();
    await createStay(data);
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col justify-center gap-4 pt-4">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) =>
            isLoading ? (
              <div className="flex flex-col gap-4">
                <CircularProgress color="primary" className="text-7xl" aria-label="Publishing property..." />
                <p className="text-lg text-accentGray font-medium">Publishing Property...</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <IoCheckmarkCircleOutline className="text-7xl" />
                <p className="text-lg font-medium">
                  Property Successfully <span className="text-primary">Published!</span>
                </p>
                <Button
                  className="text-sm font-semibold w-fit"
                  color="primary"
                  radius="full"
                  variant="solid"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Dashboard
                </Button>
              </div>
            )
          }
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
        <StayDetailOverview stay={stay} />
        <StayDetailAmenities stay={stay} />
        <StayDetailAvailability stay={stay} />
        <StayDetailRules stay={stay} />
      </div>
      <div className="flex flex-col gap-2 pb-10 mx-auto w-1/2">
        <Button
          className="text-sm font-semibold"
          color="primary"
          radius="full"
          variant="solid"
          onClick={handleSubmit(onSubmit)}
        >
          Publish
        </Button>
        <Button
          className="text-sm font-semibold px-14"
          color="primary"
          radius="full"
          variant="flat"
          onClick={() => setStep(8)}
        >
          No I need to make a change
        </Button>
      </div>
    </div>
  );
};

export default CreateStayReview;
