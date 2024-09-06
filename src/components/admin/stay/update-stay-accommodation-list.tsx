'use client';

import { removeAccommodation } from '@/server';
import { IStay } from '@/types';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiDotsVertical } from 'react-icons/hi';

interface Props {
  stay: IStay;
  onUpdate: (id: string) => void;
}

const UpdateStayAccommodationList = ({ stay: { _id, accommodation }, onUpdate }: Props) => {
  const [accId, setAccId] = useState<string>('');
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

  const startDelete = (id: string) => {
    onOpen();
    setAccId(id);
  };
  const onDelete = async () => {
    if (accommodation.length <= 1) {
      onClose();
      return toast.error('Atleast 1 accommodation is required');
    }
    try {
      await removeAccommodation(_id, accId);
      onClose();
      return toast.success('Accommodation successfully removed');
    } catch (err: any) {
      return toast.error(err.message);
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <ModalBody className="flex flex-col justify-center gap-4 p-4">
              <p className="text-lg text-accentGray text-center">Are you sure you want to delete this accommodation</p>
              <div className="flex items-center gap-4">
                <Button radius="sm" variant="flat" color="primary" className="font-base w-full" onPress={onClose}>
                  Cancel
                </Button>
                <Button radius="sm" variant="flat" color="danger" className="font-base w-full" onPress={onDelete}>
                  Remove
                </Button>
              </div>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
      <div className="flex flex-col gap-2">
        {accommodation.map(({ id, name, description, images }) => (
          <div className="flex items-center justify-between gap-10" key={id}>
            <div className="flex items-center gap-2">
              <Image
                alt={name}
                width="full"
                src={images[0]}
                radius="sm"
                removeWrapper
                className="object-cover h-16 w-16"
              />
              <div className="flex flex-col">
                <h5 className="text-lg font-semibold">{name}</h5>
                <p className="text-sm">{description}</p>
              </div>
            </div>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button aria-label="Add Amenity" isIconOnly radius="sm" size="sm" variant="light" color="primary">
                  <HiDotsVertical className="text-lg" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Accommodation actions" variant="flat">
                <DropdownItem key="update accommodation" onPress={() => onUpdate(id)}>
                  Update
                </DropdownItem>
                <DropdownItem key="delete accommodation" color="danger" onPress={() => startDelete(id)}>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        ))}
      </div>
    </>
  );
};

export default UpdateStayAccommodationList;
