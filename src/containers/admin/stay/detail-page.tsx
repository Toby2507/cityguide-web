'use client';

import {
  UpdateStayAccommodation,
  UpdateStayAmenities,
  UpdateStayDetails,
  UpdateStayImages,
  UpdateStayRules,
} from '@/components';
import UpdateStayAddress from '@/components/admin/stay/update-stay-address';
import {
  DetailPageAmenities,
  DetailPageOverview,
  StayDetailAvailability,
  StayDetailInfoReview,
  StayDetailRules,
} from '@/containers';
import { IStay, Updates } from '@/types';
import { Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';

interface Props {
  stay: IStay;
}

const AdminDetailPage = ({ stay }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
              {updateType === 'accommodation' ? <UpdateStayAccommodation onClose={onClose} stay={stay} /> : null}
              {updateType === 'details' ? <UpdateStayDetails onClose={onClose} stay={stay} /> : null}
              {updateType === 'images' ? <UpdateStayImages onClose={onClose} stay={stay} /> : null}
              {updateType === 'rules' ? <UpdateStayRules onClose={onClose} stay={stay} /> : null}
              {updateType === 'amenities' ? <UpdateStayAmenities onClose={onClose} stay={stay} /> : null}
              {updateType === 'map' ? <UpdateStayAddress onClose={onClose} stay={stay} /> : null}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
      <div className="flex flex-col gap-4 max-w-7xl pt-14 pb-6 mx-auto w-full">
        <DetailPageOverview onUpdate={onUpdate} {...stay} />
        <DetailPageAmenities onUpdate={() => onUpdate('amenities')} {...stay} />
        <StayDetailAvailability onUpdate={() => onUpdate('accommodation')} stay={stay} />
        <StayDetailInfoReview stay={stay} isAdmin />
        <StayDetailRules onUpdate={() => onUpdate('rules')} stay={stay} />
      </div>
    </>
  );
};

export default AdminDetailPage;
