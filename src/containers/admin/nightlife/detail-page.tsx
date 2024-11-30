'use client';

import { UpdatePropertyAddress, UpdatePropertyAmenities, UpdatePropertyImages } from '@/components';
import UpdateNightlifeDetails from '@/components/admin/nightlife/update-nightlife-details';
import UpdateNightlifeInfo from '@/components/admin/nightlife/update-nightlife-info';
import { DetailPageAmenities, DetailPageOverview, NightlifeDetailInfo } from '@/containers';
import { deleteNightlife, getNightlifeById } from '@/server';
import { PropertyType, Updates } from '@/types';
import { paths } from '@/utils';
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  nightlifeId: string;
}

const AdminNightlifeDetailPage = ({ nightlifeId }: Props) => {
  const { push } = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updateType, setUpdateType] = useState<Updates>('details');
  const { data: nightlife, isPending } = useQuery({
    queryKey: ['nightlife', 'admin', nightlifeId],
    queryFn: async () => await getNightlifeById(nightlifeId),
  });

  if (!nightlife || isPending) return null;

  const onUpdate = (type: Updates) => {
    setUpdateType(type);
    onOpen();
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await deleteNightlife(nightlife._id);
      push(paths.adminNightlifes());
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
      <div className="flex flex-col gap-4 max-w-7xl pt-14 mx-auto w-full">
        <DetailPageOverview
          amenities={nightlife.details.amenities}
          onUpdate={onUpdate}
          propType={PropertyType.NIGHTLIFE}
          {...nightlife}
        />
        <DetailPageAmenities
          amenities={nightlife.details.amenities}
          name={nightlife.name}
          onUpdate={() => onUpdate('amenities')}
        />
        <NightlifeDetailInfo nightlife={nightlife} onUpdate={() => onUpdate('info')} />
        <Button className="mt-1" color="danger" isLoading={isLoading} onPress={onDelete} variant="flat">
          Delete Nightlife
        </Button>
      </div>
    </>
  );
};

export default AdminNightlifeDetailPage;
