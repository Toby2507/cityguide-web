'use client';

import { removeMenuItem } from '@/server';
import { IRestaurant } from '@/types';
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
  restaurant: IRestaurant;
  onUpdate: (id: string) => void;
}

const UpdateRestaurantMenuList = ({ restaurant: { _id, menu }, onUpdate }: Props) => {
  const [menuId, setMenuId] = useState<string>('');
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

  const startDelete = (id: string) => {
    onOpen();
    setMenuId(id);
  };
  const onDelete = async () => {
    if (menu.length <= 1) {
      onClose();
      return toast.error('Atleast 1 menu item is required');
    }
    try {
      await removeMenuItem(_id, menuId);
      onClose();
      return toast.success('Menu item successfully removed');
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
        {menu.map(({ id, name, description, imgUrl }) => (
          <div className="flex items-center justify-between gap-10" key={id}>
            <div className="flex items-center gap-2">
              <Image
                alt={name}
                width="full"
                src={imgUrl}
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

export default UpdateRestaurantMenuList;
