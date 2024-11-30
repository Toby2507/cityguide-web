'use client';

import {
  UpdatePropertyAddress,
  UpdatePropertyAmenities,
  UpdatePropertyImages,
  UpdateStayAccommodation,
  UpdateStayDetails,
  UpdateStayRules,
} from '@/components';
import {
  DetailPageAmenities,
  DetailPageOverview,
  StayDetailAvailability,
  StayDetailInfoReview,
  StayDetailRules,
} from '@/containers';
import { deleteStay, getStayById } from '@/server';
import { PropertyType, Updates } from '@/types';
import { paths } from '@/utils';
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  stayId: string;
}

const AdminStayDetailPage = ({ stayId }: Props) => {
  const { push } = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updateType, setUpdateType] = useState<Updates>('details');
  const { data: stay, isPending } = useQuery({
    queryKey: ['stay', 'admin', stayId],
    queryFn: async () => await getStayById(stayId),
  });

  if (!stay || isPending) return null;
  const onUpdate = (type: Updates) => {
    setUpdateType(type);
    onOpen();
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await deleteStay(stay._id);
      push(paths.adminStays());
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
              {updateType === 'accommodation' ? <UpdateStayAccommodation onClose={onClose} stay={stay} /> : null}
              {updateType === 'details' ? <UpdateStayDetails onClose={onClose} stay={stay} /> : null}
              {updateType === 'images' ? (
                <UpdatePropertyImages onClose={onClose} property={stay} type={PropertyType.STAY} />
              ) : null}
              {updateType === 'rules' ? <UpdateStayRules onClose={onClose} stay={stay} /> : null}
              {updateType === 'amenities' ? (
                <UpdatePropertyAmenities onClose={onClose} property={stay} type={PropertyType.STAY} />
              ) : null}
              {updateType === 'map' ? (
                <UpdatePropertyAddress onClose={onClose} property={stay} type={PropertyType.STAY} />
              ) : null}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
      <div className="flex flex-col gap-4 max-w-7xl pt-14 mx-auto w-full">
        <DetailPageOverview onUpdate={onUpdate} propType={PropertyType.STAY} {...stay} />
        <DetailPageAmenities onUpdate={() => onUpdate('amenities')} {...stay} />
        <StayDetailAvailability onUpdate={() => onUpdate('accommodation')} stay={stay} />
        <StayDetailInfoReview stay={stay} isAdmin />
        <StayDetailRules onUpdate={() => onUpdate('rules')} stay={stay} />
        <Button className="mt-1" color="danger" isLoading={isLoading} onPress={onDelete} variant="flat">
          Delete Stay
        </Button>
      </div>
    </>
  );
};

export default AdminStayDetailPage;
