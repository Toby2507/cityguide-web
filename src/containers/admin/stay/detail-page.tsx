'use client';

import { UpdateStayAccommodation, UpdateStayDetails, UpdateStayImages, UpdateStayRules } from '@/components';
import {
  DetailPageAmenities,
  DetailPageOverview,
  StayDetailAvailability,
  StayDetailInfoReview,
  StayDetailRules,
} from '@/containers';
import { IStay, IUpdateStay } from '@/types';
import { Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface Props {
  stay: IStay;
}
type Updates = 'details' | 'images' | 'rules' | 'accommodation' | 'map';

const AdminDetailPage = ({ stay }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const method = useForm<IUpdateStay>({ defaultValues: stay, mode: 'onChange' });
  const [updateType, setUpdateType] = useState<Updates>('details');

  const onUpdate = (type: Updates) => {
    setUpdateType(type);
    onOpen();
  };
  return (
    <>
      <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" size="5xl">
        <ModalContent className="max-h-[90vh]">
          {(onClose) => (
            <ModalBody>
              {updateType === 'accommodation' ? (
                <UpdateStayAccommodation onClose={onClose} stay={stay} />
              ) : (
                <FormProvider {...method}>
                  {updateType === 'details' ? <UpdateStayDetails onClose={onClose} stay={stay} /> : null}
                  {updateType === 'images' ? <UpdateStayImages /> : null}
                  {updateType === 'rules' ? <UpdateStayRules onClose={onClose} stay={stay} /> : null}
                </FormProvider>
              )}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
      <div className="flex flex-col gap-4 max-w-7xl pt-14 pb-6 mx-auto w-full">
        <DetailPageOverview onUpdate={() => onUpdate('details')} {...stay} />
        <DetailPageAmenities {...stay} />
        <StayDetailAvailability onUpdate={() => onUpdate('accommodation')} stay={stay} />
        <StayDetailInfoReview stay={stay} />
        <StayDetailRules onUpdate={() => onUpdate('rules')} stay={stay} />
      </div>
    </>
  );
};

export default AdminDetailPage;