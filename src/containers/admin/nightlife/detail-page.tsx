'use client';

import { UpdatePropertyImages, UpdatePropertyAmenities, UpdatePropertyAddress } from '@/components';
import UpdateNightlifeDetails from '@/components/admin/nightlife/update-nightlife-details';
import UpdateNightlifeInfo from '@/components/admin/nightlife/update-nightlife-info';
import { DetailPageAmenities, DetailPageOverview, NightlifeDetailInfo } from '@/containers';
import { INightLife, PropertyType, Updates } from '@/types';
import { Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';

interface Props {
  nightlife: INightLife;
}

const AdminNightlifeDetailPage = ({ nightlife }: Props) => {
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
              {updateType === 'images' ? (
                <UpdatePropertyImages onClose={onClose} property={nightlife} type={PropertyType.NIGHTLIFE} />
              ) : null}
              {updateType === 'amenities' ? (
                <UpdatePropertyAmenities onClose={onClose} property={nightlife} type={PropertyType.NIGHTLIFE} />
              ) : null}
              {updateType === 'map' ? (
                <UpdatePropertyAddress onClose={onClose} property={nightlife} type={PropertyType.NIGHTLIFE} />
              ) : null}
              {updateType === 'details' ? <UpdateNightlifeDetails onClose={onClose} nightlife={nightlife} /> : null}
              {updateType === 'info' ? <UpdateNightlifeInfo onClose={onClose} nightlife={nightlife} /> : null}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
      <div className="flex flex-col gap-4 max-w-7xl pt-14 pb-6 mx-auto w-full">
        <DetailPageOverview amenities={nightlife.details.amenities} onUpdate={onUpdate} {...nightlife} />
        <DetailPageAmenities
          amenities={nightlife.details.amenities}
          name={nightlife.name}
          onUpdate={() => onUpdate('amenities')}
        />
        <NightlifeDetailInfo nightlife={nightlife} onUpdate={() => onUpdate('info')} />
      </div>
    </>
  );
};

export default AdminNightlifeDetailPage;
