'use client';

import { UpdatePropertyAmenities, UpdatePropertyImages } from '@/components';
import { DetailPageAmenities, DetailPageOverview, RestaurantDetailInfo, RestaurantDetailMenu } from '@/containers';
import { IRestaurant, PropertyType, Updates } from '@/types';
import { Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';

interface Props {
  restaurant: IRestaurant;
}

const AdminRestaurantDetailPage = ({ restaurant }: Props) => {
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
                <UpdatePropertyImages onClose={onClose} property={restaurant} type={PropertyType.RESTAURANT} />
              ) : null}
              {updateType === 'amenities' ? (
                <UpdatePropertyAmenities onClose={onClose} property={restaurant} type={PropertyType.RESTAURANT} />
              ) : null}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
      <div className="flex flex-col gap-4 max-w-7xl pt-14 pb-6 mx-auto w-full">
        <DetailPageOverview amenities={restaurant.details.amenities} onUpdate={onUpdate} {...restaurant} />
        <DetailPageAmenities
          amenities={restaurant.details.amenities}
          name={restaurant.name}
          onUpdate={() => onUpdate('amenities')}
        />
        <RestaurantDetailMenu menu={restaurant.menu} />
        <RestaurantDetailInfo {...restaurant} />
      </div>
    </>
  );
};

export default AdminRestaurantDetailPage;
