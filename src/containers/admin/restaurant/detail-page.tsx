'use client';

import {
  UpdatePropertyAddress,
  UpdatePropertyAmenities,
  UpdatePropertyImages,
  UpdateRestaurantDetails,
  UpdateRestaurantInfo,
  UpdateRestaurantMenu,
} from '@/components';
import { DetailPageAmenities, DetailPageOverview, RestaurantDetailInfo, RestaurantDetailMenu } from '@/containers';
import { deleteRestaurant } from '@/server';
import { IRestaurant, PropertyType, Updates } from '@/types';
import { paths } from '@/utils';
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  restaurant: IRestaurant;
}

const AdminRestaurantDetailPage = ({ restaurant }: Props) => {
  const { push } = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updateType, setUpdateType] = useState<Updates>('details');

  const onUpdate = (type: Updates) => {
    setUpdateType(type);
    onOpen();
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await deleteRestaurant(restaurant._id);
      push(paths.adminRestaurants());
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
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
              {updateType === 'map' ? (
                <UpdatePropertyAddress onClose={onClose} property={restaurant} type={PropertyType.RESTAURANT} />
              ) : null}
              {updateType === 'info' ? <UpdateRestaurantInfo onClose={onClose} restaurant={restaurant} /> : null}
              {updateType === 'details' ? <UpdateRestaurantDetails onClose={onClose} restaurant={restaurant} /> : null}
              {updateType === 'menu' ? <UpdateRestaurantMenu onClose={onClose} restaurant={restaurant} /> : null}
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
        <RestaurantDetailMenu menu={restaurant.menu} onUpdate={() => onUpdate('menu')} />
        <RestaurantDetailInfo restaurant={restaurant} onUpdate={() => onUpdate('info')} />
        <Button className="mt-4" color="danger" isLoading={isLoading} onPress={onDelete} variant="flat">
          Delete Restaurant
        </Button>
      </div>
    </>
  );
};

export default AdminRestaurantDetailPage;
